# DockNet Architecture & System Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Component Details](#component-details)
4. [Data Flow](#data-flow)
5. [Deployment & Configuration](#deployment--configuration)
6. [Advantages](#advantages)
7. [Caveats & Limitations](#caveats--limitations)
8. [API Reference](#api-reference)
9. [WebSocket Protocol](#websocket-protocol)
10. [Getting Started](#getting-started)

---

## Overview

**DockNet** is a Docker-powered network emulator designed for prototyping, benchmarking, and stress-testing distributed system algorithms. It provides a containerized playground for simulating arbitrary network topologies and running custom protocols on virtualized nodes.

### Key Use Cases
- Testing Tangle-style DAG (Directed Acyclic Graph) algorithms
- Prototyping peer-to-peer (P2P) protocols
- Benchmarking consensus algorithms
- Simulating energy microgrid networks
- Stress-testing custom distributed protocols

### Core Features
- **Flexible Topologies**: Define arbitrary node counts and connectivity patterns via Docker Compose
- **Pluggable Workloads**: Drop in any executable or script in each container
- **Real-Time Telemetry**: Stream logs and metrics over WebSockets
- **Repeatable Experiments**: Version-controlled configuration files for identical test reruns
- **Containerized**: Isolated, reproducible environments using Docker

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Network (172.25.0.0/24)           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Central Node    │  │  Dashboard UI    │  │  Worker Node │  │
│  │  (172.25.0.10)   │  │  (172.25.0.20)   │  │  (Dynamic)   │  │
│  │  Port: 8000      │  │  Port: 80        │  │              │  │
│  │                  │  │                  │  │              │  │
│  │ - Express API    │  │ - React App      │  │ - tangle_poc │  │
│  │ - WebSocket Hub  │  │ - Graph Viewer   │  │ - Monitoring │  │
│  │ - Docker Mgmt    │  │ - Live Telemetry │  │ - WS Client  │  │
│  │ - SQLite DB      │  │                  │  │              │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│         ▲                      ▲                      ▲           │
│         │ WS (port 4000)       │ WS                  │ WS        │
│         └──────────────────────┴──────────────────────┘           │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Shared Volume (program-files)                           │   │
│  │  - Uploaded binaries and scripts                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         ▲
         │ HTTP/REST
         │ (Port 8000, 3000)
         │
    ┌────┴─────┐
    │   Host   │
    │ Machine  │
    └──────────┘
```

### Three-Tier Architecture

#### 1. **Central Node** (Orchestration & Coordination)
- **Role**: Central hub for managing worker nodes, collecting telemetry, and broadcasting to dashboards
- **Container**: `docknet-central`
- **IP**: `172.25.0.10`
- **Port**: `8000` (HTTP API + WebSocket)
- **Technology Stack**:
  - Express.js (REST API)
  - Node.js WebSocket server
  - SQLite database
  - Docker API client (dockerode)

#### 2. **Dashboard** (Real-Time Visualization)
- **Role**: Web-based UI for monitoring simulation state, viewing transaction DAGs, and controlling experiments
- **Container**: `docknet-dashboard`
- **IP**: `172.25.0.20`
- **Port**: `80` (served via NGINX in production)
- **Technology Stack**:
  - React 19
  - Vite (build tool)
  - Ant Design (UI components)
  - react-force-graph-2d/3d (graph visualization)
  - WebSocket client for real-time updates

#### 3. **Worker Nodes** (Simulation Execution)
- **Role**: Execute the distributed protocol (e.g., tangle_poc) and report telemetry
- **Container**: `docknet/worker:latest` (template-based)
- **IP**: Dynamic (172.25.0.x range)
- **Technology Stack**:
  - Ubuntu 20.04 base
  - C++ runtime (tangle-sg binary)
  - WebSocket client for communication
  - Monitoring/telemetry collection

---

## Component Details

### Central Node Components

#### 1. **Express Application** (`app.js`)
Configures middleware and routes:
- **Security**: Helmet, XSS protection, rate limiting, CORS
- **Parsing**: JSON (1GB limit), URL-encoded (100MB limit)
- **Logging**: Morgan for HTTP request logging
- **Compression**: gzip compression for responses
- **Routes**: `/api/*` endpoints for worker management and telemetry

#### 2. **Server** (`server.js`)
- Starts Express app on port 8000
- Handles uncaught exceptions and unhandled rejections
- Graceful shutdown on errors

#### 3. **Worker Controller** (`controllers/workerController.js`)

**`startWorkers` Endpoint** (`GET /api/start`)
- **Purpose**: Spin up N worker containers with specified parameters
- **Query Parameters**:
  - `node_count`: Number of worker nodes to launch (required, ≥1)
  - `tx_count`: Number of transactions per node (required, ≥1)
  - `tx_delay`: Delay between transactions in ms (required, ≥0)
  - `max_peers`: Maximum peer connections per node (required, ≥1)
  - `pow`: Proof-of-Work difficulty (optional, 1-5, default: 3)
  - `run`: Run ID for grouping results (optional, default: 0)
  - `wait`: Wait period in seconds before shutdown (optional, default: 300)

- **Process**:
  1. Validates all parameters
  2. Removes existing worker containers
  3. Creates N new containers with environment variables
  4. Starts all containers in parallel
  5. Returns success message

**`uploadTelemetry` Endpoint** (`POST /api/telemetry`)
- **Purpose**: Receive and persist telemetry data from worker nodes
- **Request Body**:
  ```json
  {
    "nodeId": "worker1",
    "tangle": [...],        // Transaction DAG data
    "peers": [...],         // Peer connection info
    "metrics": {...},       // Performance metrics
    "runId": 0,
    "metadata": {...}       // Optional metadata
  }
  ```
- **Process**:
  1. Creates directory structure: `data/runX/nodeY/`
  2. Saves tangle, peers, metrics as JSON files
  3. Saves metadata with timestamp
  4. Returns success response with file paths

#### 4. **WebSocket Handlers**

**Worker Socket** (`sockets/workerSocket.js`)
- Maintains map of connected worker nodes
- Handles telemetry messages from workers
- Inserts telemetry into SQLite database
- Broadcasts telemetry to all connected dashboards
- Implements heartbeat/ping mechanism (5s interval)
- Detects offline nodes (10s timeout)
- Broadcasts node status (online/offline) to dashboards

**Dashboard Socket** (`sockets/dashboardSocket.js`)
- Registers dashboard clients
- Handles dashboard connections/disconnections
- Forwards broadcast messages to dashboards
- Implements heartbeat mechanism

#### 5. **Database** (`utils/db.js`)
- **Type**: SQLite3
- **Location**: `central/data/db.sqlite3`
- **Schema**:
  ```sql
  CREATE TABLE telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    node_id TEXT,
    tx_id TEXT,
    tx_time_ms INTEGER,
    pow_time_ms INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  ```
- **Functions**:
  - `insertTelemetry()`: Insert transaction telemetry
  - `getRecentTelemetry(limit)`: Fetch latest N records

#### 6. **Broadcast Utility** (`utils/broadcast.js`)
- Maintains set of connected dashboard clients
- Broadcasts messages to all connected dashboards
- Handles client lifecycle (add, remove on disconnect)
- Implements heartbeat/ping mechanism (5s interval)
- Detects offline clients (10s timeout)

#### 7. **File Saving Utility** (`utils/saveFIle.js`)
- Saves JSON data to files
- Handles directory creation
- Provides error handling and logging

### Worker Node Components

#### 1. **Dockerfile**
- **Base Image**: Ubuntu 20.04
- **Build Arguments**: `BASE_IP` (default: 172.25.0.1)
- **Dependencies**:
  - Build tools: git, curl, build-essential, pkg-config
  - Libraries: libssl-dev, libwebsocketpp-dev, libboost-all-dev, libcurl4-openssl-dev, libjsoncpp-dev, libsodium-dev
- **Entrypoint**: `entrypoint.sh`
- **Environment**: HMAC_SECRET for authentication

#### 2. **Entrypoint Script** (`entrypoint.sh`)
- Clones or pulls tangle-sg repository from specified branch
- Runs `install.sh` to build the binary
- Copies built binary to `/app/tangle_poc`
- Sets `MY_IP` environment variable
- Executes the tangle_poc binary

### Dashboard Components

#### 1. **React App** (`src/App.jsx`)
- **State Management**:
  - `nodes`: List of worker nodes
  - `selectedNode`: Currently selected node
  - `graphData`: Transaction data for visualization

- **Features**:
  - Node list sidebar
  - Graph viewer for transaction DAG
  - Toolbar for simulation control
  - Navbar with title

#### 2. **UI Components** (`src/components/`)
- `Navbar`: Header with title
- `Toolbar`: Control buttons for simulation
- `Sidebar`: Node list and selection
- `GraphViewer`: Transaction graph visualization

---

## Data Flow

### Simulation Startup Flow

```
User/Dashboard
    │
    ├─ HTTP GET /api/start?node_count=5&tx_count=100&...
    │
    ▼
Central Node (startWorkers)
    │
    ├─ Validate parameters
    ├─ Remove existing containers
    ├─ Create 5 new worker containers with env vars
    ├─ Start all containers
    │
    ▼
Worker Nodes (entrypoint.sh)
    │
    ├─ Clone/pull tangle-sg repo
    ├─ Build binary
    ├─ Execute tangle_poc
    │
    ▼
tangle_poc Process
    │
    ├─ Initialize node with NODE_ID, MAX_PEERS, etc.
    ├─ Connect to peers
    ├─ Start generating transactions
    └─ Send telemetry via WebSocket to Central
```

### Telemetry Collection Flow

```
Worker Node (tangle_poc)
    │
    ├─ Generate transaction
    ├─ Calculate PoW
    ├─ Send JSON message via WebSocket:
    │  {
    │    "node_id": "worker1",
    │    "tx_id": "tx-123",
    │    "tx_time_ms": 45,
    │    "pow_time_ms": 120
    │  }
    │
    ▼
Central Node (workerSocket)
    │
    ├─ Parse message
    ├─ Insert into SQLite database
    ├─ Broadcast to all dashboards:
    │  {
    │    "type": "telemetry",
    │    "data": {...}
    │  }
    │
    ▼
Dashboard (WebSocket client)
    │
    ├─ Receive broadcast message
    ├─ Update state
    └─ Re-render UI with new telemetry
```

### Bulk Telemetry Upload Flow

```
Worker Node (at end of simulation)
    │
    ├─ Collect all tangle data, peers, metrics
    ├─ HTTP POST /api/telemetry with large JSON payload
    │  {
    │    "nodeId": "worker1",
    │    "tangle": [...],
    │    "peers": [...],
    │    "metrics": {...},
    │    "runId": 0,
    │    "metadata": {...}
    │  }
    │
    ▼
Central Node (uploadTelemetry)
    │
    ├─ Create data/run0/worker1/ directory
    ├─ Save tangle.json
    ├─ Save peers.json
    ├─ Save metrics.json
    ├─ Save metadata.json
    │
    ▼
File System
    │
    └─ Persistent storage for analysis
```

---

## Deployment & Configuration

### Docker Compose Setup

**File**: `docker-compose.yaml`

#### Network Configuration
- **Driver**: Bridge
- **Subnet**: `172.25.0.0/24` (customizable)
- **Note**: Subnet must match worker Dockerfile and all service configurations

#### Services

**1. docknet-central**
```yaml
- Image: central:latest (built from ./central/Dockerfile)
- IP: 172.25.0.10
- Port: 8000 (HTTP + WebSocket)
- Volumes:
  - ./central/data:/data (SQLite persistence)
  - /var/run/docker.sock:/var/run/docker.sock (Docker API access)
- Healthcheck: curl http://localhost:8000/ every 30s
```

**2. docknet-dashboard**
```yaml
- Image: dashboard:latest (built from ./dashboard/Dockerfile)
- IP: 172.25.0.20
- Port: 3000 → 80 (NGINX/React)
- Volumes:
  - program-files:/mnt/uploads (shared upload area)
```

**3. docknet-worker-template**
```yaml
- Image: docknet/worker:latest (built from ./worker/Dockerfile)
- Purpose: Build image only (no running container)
- Build Args: BASE_IP (default: 172.25.0.1)
- Entrypoint: /bin/true (no-op)
```

**4. docknet-worker** (commented out)
```yaml
- Template for dynamic worker creation
- Normally created via Docker API in startWorkers
- Can be uncommented for static deployment
- Supports deploy.replicas for scaling
```

#### Shared Volume
- **Name**: `program-files`
- **Purpose**: Shared storage for uploaded binaries/scripts
- **Mount Points**:
  - Dashboard: `/mnt/uploads`
  - Workers: `/app/program` (read-only)

### Environment Variables

**Central Node** (`config.env`)
```
NODE_ENV=development
PORT=8000
DATA_ROOT=./data
SQLITE_FILE=./data/db.sqlite3
```

**Worker Nodes** (set by startWorkers)
```
NODE_ID=worker1
CENTRAL_WS=ws://localhost:8000/worker
REPO_URL=https://github.com/DugarRishab/tangle-sg
REPO_BRANCH=monitor
TX_COUNT=100
TX_DELAY=50
MAX_PEERS=5
POW=3
RUN_ID=0
WAIT_PERIOD=300
```

### Startup Commands

```bash
# Build all images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f docknet-central
docker-compose logs -f docknet-dashboard

# Stop services
docker-compose down

# Clean up (remove volumes)
docker-compose down -v
```

---

## Advantages

### 1. **Isolation & Reproducibility**
- Each node runs in a separate container with identical environment
- Version-controlled configurations ensure repeatable experiments
- No dependency conflicts between nodes

### 2. **Scalability**
- Easily spin up 10, 100, or 1000 nodes dynamically
- Docker handles resource allocation and networking
- Parallel container creation for fast startup

### 3. **Flexibility**
- Pluggable workloads: drop any executable into workers
- Customizable network topology via Docker Compose
- Configurable parameters (node count, transaction rate, PoW difficulty, etc.)

### 4. **Real-Time Monitoring**
- WebSocket-based telemetry streaming
- Live dashboard with transaction graph visualization
- Heartbeat mechanism for node health tracking

### 5. **Data Persistence**
- SQLite database for quick queries
- JSON file storage for detailed analysis
- Structured directory hierarchy (run/node/metric)

### 6. **Development-Friendly**
- Local Docker setup mirrors production
- Easy debugging with container logs
- Hot-reload support in dashboard (Vite)

### 7. **Minimal Dependencies**
- No external databases required (SQLite embedded)
- No message queues needed (WebSocket direct)
- Self-contained within Docker network

---

## Caveats & Limitations

### 1. **Network Simulation Limitations**
- **No Latency Simulation**: Docker bridge network has near-zero latency
  - *Workaround*: Use `tc` (traffic control) in entrypoint.sh to add artificial delays
- **No Packet Loss**: Network is 100% reliable
  - *Workaround*: Implement packet loss in application logic
- **No Bandwidth Throttling**: Full bandwidth available
  - *Workaround*: Use Docker resource limits or tc commands

### 2. **Scalability Constraints**
- **Host Resource Limits**: Each container consumes CPU, memory, and file descriptors
  - *Typical Limit*: 100-500 nodes per host depending on workload
  - *Workaround*: Use Docker Swarm or Kubernetes for multi-host deployment
- **SQLite Concurrency**: SQLite has limited concurrent write support
  - *Workaround*: Batch inserts or use PostgreSQL for high-throughput scenarios

### 3. **Data Collection Issues**
- **Large Payloads**: Bulk telemetry uploads (POST /api/telemetry) can be slow
  - *Limit*: 1GB JSON body size (configurable in Express)
  - *Workaround*: Stream telemetry incrementally via WebSocket instead
- **File I/O Bottleneck**: Saving large JSON files can block the event loop
  - *Workaround*: Use async file operations or worker threads

### 4. **WebSocket Reliability**
- **No Reconnection Logic**: If a worker loses connection, it must manually reconnect
  - *Workaround*: Implement exponential backoff in worker code
- **Message Ordering**: WebSocket doesn't guarantee message order in all scenarios
  - *Workaround*: Add sequence numbers to messages

### 5. **Dashboard Limitations**
- **No Authentication**: Dashboard is open to anyone on the network
  - *Workaround*: Use reverse proxy with auth (nginx, Caddy)
- **No Persistence**: Dashboard state is lost on refresh
  - *Workaround*: Fetch historical data from central node API
- **Graph Rendering**: Large graphs (1000+ nodes) may be slow
  - *Workaround*: Implement node clustering or pagination

### 6. **Deployment Constraints**
- **Docker Daemon Access**: Central node requires access to host Docker daemon
  - *Security Risk*: Equivalent to root access
  - *Workaround*: Use rootless Docker or restrict socket permissions
- **Volume Mounts**: Shared volume must exist on host
  - *Workaround*: Pre-create or use named volumes

### 7. **Monitoring Gaps**
- **No Built-in Metrics**: No CPU, memory, or network metrics collected
  - *Workaround*: Integrate Prometheus + Grafana
- **No Distributed Tracing**: Hard to track message flow across nodes
  - *Workaround*: Add correlation IDs to messages

### 8. **Configuration Rigidity**
- **Subnet Hardcoded**: Changing subnet requires updates in multiple places
  - *Workaround*: Use environment variables or templating
- **No Dynamic Topology Changes**: Can't add/remove nodes mid-simulation
  - *Workaround*: Implement dynamic peer discovery in application

---

## API Reference

### REST Endpoints

#### 1. Health Check
```
GET /
Response: "Central Node is running 🚀"
```

#### 2. Start Workers
```
GET /api/start?node_count=5&tx_count=100&tx_delay=50&max_peers=5&pow=3&run=0&wait=300

Query Parameters:
  - node_count (required): Number of worker nodes (≥1)
  - tx_count (required): Transactions per node (≥1)
  - tx_delay (required): Delay between transactions in ms (≥0)
  - max_peers (required): Max peer connections (≥1)
  - pow (optional): PoW difficulty 1-5 (default: 3)
  - run (optional): Run ID (default: 0)
  - wait (optional): Wait period in seconds (default: 300)

Response:
  {
    "message": "5 workers started"
  }

Status Codes:
  - 200: Success
  - 400: Invalid parameters
```

#### 3. Upload Telemetry
```
POST /api/telemetry
Content-Type: application/json

Request Body:
  {
    "nodeId": "worker1",
    "tangle": [
      {
        "transaction_id": "tx-001",
        "timestamp": "2025-06-20T10:00:00Z",
        "sender": "Node Alpha",
        "receiver": "Node Beta",
        "amount": 100,
        "previous_transactions": [],
        "cumulative_weight": 1,
        "proof_of_work": "0000a1b2c3"
      }
    ],
    "peers": [
      {
        "peer_id": "worker2",
        "connection_time": 1234567890,
        "status": "connected"
      }
    ],
    "metrics": {
      "total_transactions": 100,
      "avg_tx_time_ms": 45,
      "avg_pow_time_ms": 120,
      "peak_memory_mb": 256
    },
    "runId": 0,
    "metadata": {
      "start_time": "2025-06-20T10:00:00Z",
      "end_time": "2025-06-20T10:05:00Z",
      "duration_seconds": 300
    }
  }

Response:
  {
    "message": "success",
    "run": "run0",
    "nodeId": "worker1",
    "saved": {
      "tangle": "tangle.json",
      "peers": "peers.json",
      "metrics": "metrics.json"
    }
  }

Status Codes:
  - 200: Success
  - 400: Missing required fields
  - 500: Server error
```

---

## WebSocket Protocol

### Connection URLs

**Worker Connection**
```
ws://172.25.0.10:8000/worker
```

**Dashboard Connection**
```
ws://172.25.0.10:8000/dashboard
```

### Message Types

#### 1. Telemetry (Worker → Central)
```json
{
  "node_id": "worker1",
  "tx_id": "tx-001",
  "tx_time_ms": 45,
  "pow_time_ms": 120
}
```

#### 2. Telemetry Broadcast (Central → Dashboard)
```json
{
  "type": "telemetry",
  "data": {
    "node_id": "worker1",
    "tx_id": "tx-001",
    "tx_time_ms": 45,
    "pow_time_ms": 120
  }
}
```

#### 3. Node Status (Central → Dashboard)
```json
{
  "type": "node_status",
  "payload": {
    "online_nodes": ["worker1", "worker2", "worker3"],
    "offline_nodes": ["worker4", "worker5"]
  }
}
```

#### 4. Ping (Central → Worker/Dashboard)
```json
{
  "type": "ping"
}
```

#### 5. Pong (Worker/Dashboard → Central)
```json
{
  "type": "pong"
}
```

### Heartbeat Mechanism
- **Interval**: 5 seconds
- **Timeout**: 10 seconds (no pong response)
- **Action on Timeout**: Connection terminated, node marked offline

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 16+ (for local development)
- C++ build tools (for tangle-sg compilation)

### Quick Start

#### 1. Clone Repository
```bash
cd d:\coding\dev\tangleProj\docknet
```

#### 2. Build Docker Images
```bash
docker-compose build
```

#### 3. Start Services
```bash
docker-compose up -d
```

#### 4. Verify Services
```bash
# Check running containers
docker-compose ps

# Check central node health
curl http://localhost:8000/

# Access dashboard
# Open browser: http://localhost:3000
```

#### 5. Start a Simulation
```bash
# Start 5 worker nodes with 100 transactions each
curl "http://localhost:8000/api/start?node_count=5&tx_count=100&tx_delay=50&max_peers=5&pow=3"

# Monitor logs
docker-compose logs -f docknet-central
```

#### 6. View Results
- **Dashboard**: http://localhost:3000 (real-time telemetry)
- **Data Files**: `central/data/run0/worker1/` (persistent results)
- **Database**: `central/data/db.sqlite3` (SQLite)

### Development Workflow

#### Central Node
```bash
# Install dependencies
cd central
npm install

# Start with hot-reload
npm run start:dev

# Run tests
npm test
```

#### Dashboard
```bash
# Install dependencies
cd dashboard
npm install

# Start dev server (Vite)
npm run dev

# Build for production
npm run build
```

#### Worker Node
```bash
# Rebuild worker image
docker-compose build docknet-worker-template

# View worker logs
docker logs docknet-worker-1
```

### Common Tasks

#### Change Network Subnet
1. Update `docker-compose.yaml` subnet (line 8)
2. Update `worker/Dockerfile` BASE_IP (line 3)
3. Update `central/config.env` if needed
4. Rebuild: `docker-compose build`

#### Increase Node Limit
1. Adjust Docker resource limits in `docker-compose.yaml`
2. Increase host file descriptor limit: `ulimit -n 65536`
3. Monitor with: `docker stats`

#### Collect Metrics
1. Telemetry is automatically saved to `central/data/runX/nodeY/`
2. Query SQLite: `sqlite3 central/data/db.sqlite3 "SELECT * FROM telemetry LIMIT 10;"`
3. Analyze JSON files with Python/pandas

#### Debug Worker Node
```bash
# SSH into running worker
docker exec -it docknet-worker-1 /bin/bash

# View logs
docker logs docknet-worker-1

# Check network connectivity
docker exec docknet-worker-1 ping 172.25.0.10
```

---

## Troubleshooting

### Central Node Won't Start
- **Check**: `docker-compose logs docknet-central`
- **Common Issues**:
  - Port 8000 already in use: `lsof -i :8000`
  - Docker socket permission: `sudo chmod 666 /var/run/docker.sock`

### Workers Not Connecting
- **Check**: `docker-compose logs docknet-worker-1`
- **Common Issues**:
  - Wrong CENTRAL_WS URL: verify in startWorkers
  - Network isolation: `docker network ls` and `docker network inspect docknet_docknet`
  - Firewall: ensure port 8000 is accessible

### Dashboard Not Loading
- **Check**: `docker-compose logs docknet-dashboard`
- **Common Issues**:
  - Port 3000 in use: `lsof -i :3000`
  - CORS issues: check browser console
  - WebSocket connection failed: verify central node is running

### High Memory Usage
- **Check**: `docker stats`
- **Solutions**:
  - Reduce node count
  - Reduce transaction count
  - Increase Docker memory limit
  - Implement data cleanup in workers

### Slow Telemetry Upload
- **Check**: `curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8000/api/telemetry"`
- **Solutions**:
  - Stream telemetry via WebSocket instead of bulk upload
  - Compress JSON payload
  - Increase Express body size limit

---

## Summary

DockNet is a powerful, flexible network emulator for distributed systems research. Its containerized architecture provides isolation and reproducibility, while its real-time telemetry and dashboard enable live monitoring. However, users should be aware of network simulation limitations, scalability constraints, and the need for additional monitoring tools for production use. The system is best suited for prototyping and benchmarking on a single host; for larger-scale deployments, consider Kubernetes or Docker Swarm.
