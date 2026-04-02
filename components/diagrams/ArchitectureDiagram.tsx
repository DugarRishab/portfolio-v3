import React from "react";
import { motion } from "framer-motion";

interface DiagramNode {
	id: string;
	label: string;
	sublabel?: string;
	x: number;
	y: number;
	type: "service" | "database" | "queue" | "api" | "client" | "cache" | "external";
}

interface DiagramConnection {
	from: string;
	to: string;
	label?: string;
	animated?: boolean;
}

interface ArchitectureDiagramProps {
	title: string;
	nodes: DiagramNode[];
	connections: DiagramConnection[];
	width?: number;
	height?: number;
}

const nodeStyles = {
	service: {
		bg: "fill-purple-500/20",
		border: "stroke-purple-500",
		icon: "⚙️",
	},
	database: {
		bg: "fill-blue-500/20",
		border: "stroke-blue-500",
		icon: "🗄️",
	},
	queue: {
		bg: "fill-orange-500/20",
		border: "stroke-orange-500",
		icon: "📨",
	},
	api: {
		bg: "fill-green-500/20",
		border: "stroke-green-500",
		icon: "🔌",
	},
	client: {
		bg: "fill-cyan-500/20",
		border: "stroke-cyan-500",
		icon: "💻",
	},
	cache: {
		bg: "fill-red-500/20",
		border: "stroke-red-500",
		icon: "⚡",
	},
	external: {
		bg: "fill-gray-500/20",
		border: "stroke-gray-500",
		icon: "🌐",
	},
};

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
	title,
	nodes,
	connections,
	width = 800,
	height = 400,
}) => {
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="glass-card rounded-2xl p-6 border border-white/10 overflow-hidden"
		>
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
					<span className="material-icons-outlined text-purple-400">
						account_tree
					</span>
				</div>
				<div>
					<h4 className="text-lg font-display font-medium text-white">
						{title}
					</h4>
					<p className="text-xs text-gray-500 font-mono">
						System Architecture
					</p>
				</div>
			</div>

			<svg
				viewBox={`0 0 ${width} ${height}`}
				className="w-full h-auto max-h-[400px]"
			>
				<defs>
					<marker
						id="arrowhead"
						markerWidth="10"
						markerHeight="7"
						refX="9"
						refY="3.5"
						orient="auto"
					>
						<polygon
							points="0 0, 10 3.5, 0 7"
							fill="rgba(168, 85, 247, 0.6)"
						/>
					</marker>
					<filter id="glow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Connections */}
				{connections.map((conn, i) => {
					const fromNode = nodeMap.get(conn.from);
					const toNode = nodeMap.get(conn.to);
					if (!fromNode || !toNode) return null;

					const midX = (fromNode.x + toNode.x) / 2;
					const midY = (fromNode.y + toNode.y) / 2;

					return (
						<g key={i}>
							<motion.line
								x1={fromNode.x}
								y1={fromNode.y}
								x2={toNode.x}
								y2={toNode.y}
								stroke="rgba(168, 85, 247, 0.3)"
								strokeWidth="2"
								markerEnd="url(#arrowhead)"
								initial={{ pathLength: 0, opacity: 0 }}
								whileInView={{ pathLength: 1, opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: i * 0.1 }}
							/>
							{conn.animated && (
								<motion.circle
									r="4"
									fill="#a855f7"
									filter="url(#glow)"
									initial={{ opacity: 0 }}
									animate={{
										opacity: [0, 1, 0],
										cx: [fromNode.x, toNode.x],
										cy: [fromNode.y, toNode.y],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										delay: i * 0.3,
									}}
								/>
							)}
							{conn.label && (
								<text
									x={midX}
									y={midY - 8}
									textAnchor="middle"
									className="fill-gray-500 text-[10px] font-mono"
								>
									{conn.label}
								</text>
							)}
						</g>
					);
				})}

				{/* Nodes */}
				{nodes.map((node, i) => {
					const style = nodeStyles[node.type];
					return (
						<motion.g
							key={node.id}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
						>
							<rect
								x={node.x - 60}
								y={node.y - 30}
								width="120"
								height="60"
								rx="8"
								className={`${style.bg} ${style.border}`}
								strokeWidth="1.5"
							/>
							<text
								x={node.x}
								y={node.y - 5}
								textAnchor="middle"
								className="fill-white text-xs font-medium"
							>
								{node.label}
							</text>
							{node.sublabel && (
								<text
									x={node.x}
									y={node.y + 12}
									textAnchor="middle"
									className="fill-gray-500 text-[10px] font-mono"
								>
									{node.sublabel}
								</text>
							)}
						</motion.g>
					);
				})}
			</svg>

			{/* Legend */}
			<div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/10">
				{Object.entries(nodeStyles).map(([type, style]) => (
					<div key={type} className="flex items-center gap-2">
						<div
							className={`w-3 h-3 rounded ${style.bg} border ${style.border.replace("stroke-", "border-")}`}
						/>
						<span className="text-xs text-gray-400 capitalize">{type}</span>
					</div>
				))}
			</div>
		</motion.div>
	);
};

// Pre-built diagrams for common architectures
export const AutomationPipelineDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Automation Pipeline"
		nodes={[
			{ id: "webhook", label: "Webhook", sublabel: "Trigger", x: 100, y: 80, type: "api" },
			{ id: "queue", label: "Message Queue", sublabel: "Redis/RabbitMQ", x: 280, y: 80, type: "queue" },
			{ id: "worker", label: "Worker Pool", sublabel: "Node.js", x: 460, y: 80, type: "service" },
			{ id: "ai", label: "AI Processing", sublabel: "OpenAI/Custom", x: 640, y: 80, type: "external" },
			{ id: "db", label: "PostgreSQL", sublabel: "Primary DB", x: 460, y: 200, type: "database" },
			{ id: "cache", label: "Redis Cache", sublabel: "Hot Data", x: 280, y: 200, type: "cache" },
			{ id: "api", label: "REST API", sublabel: "Express", x: 100, y: 200, type: "api" },
			{ id: "notify", label: "Notifications", sublabel: "Email/Slack", x: 640, y: 200, type: "external" },
		]}
		connections={[
			{ from: "webhook", to: "queue", label: "async", animated: true },
			{ from: "queue", to: "worker", label: "process", animated: true },
			{ from: "worker", to: "ai", label: "analyze" },
			{ from: "worker", to: "db", label: "persist" },
			{ from: "worker", to: "notify", label: "alert" },
			{ from: "api", to: "cache", label: "read" },
			{ from: "cache", to: "db", label: "fallback" },
		]}
	/>
);

export const MicroservicesDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Microservices Architecture"
		nodes={[
			{ id: "client", label: "Client App", sublabel: "React/Mobile", x: 100, y: 140, type: "client" },
			{ id: "gateway", label: "API Gateway", sublabel: "Kong/NGINX", x: 280, y: 140, type: "api" },
			{ id: "auth", label: "Auth Service", sublabel: "JWT/OAuth", x: 460, y: 60, type: "service" },
			{ id: "user", label: "User Service", sublabel: "CRUD", x: 460, y: 140, type: "service" },
			{ id: "order", label: "Order Service", sublabel: "Business Logic", x: 460, y: 220, type: "service" },
			{ id: "db1", label: "User DB", sublabel: "PostgreSQL", x: 640, y: 60, type: "database" },
			{ id: "db2", label: "Order DB", sublabel: "PostgreSQL", x: 640, y: 220, type: "database" },
			{ id: "mq", label: "Event Bus", sublabel: "RabbitMQ", x: 640, y: 140, type: "queue" },
		]}
		connections={[
			{ from: "client", to: "gateway", animated: true },
			{ from: "gateway", to: "auth", label: "verify" },
			{ from: "gateway", to: "user" },
			{ from: "gateway", to: "order" },
			{ from: "auth", to: "db1" },
			{ from: "user", to: "db1" },
			{ from: "order", to: "db2" },
			{ from: "user", to: "mq", label: "events" },
			{ from: "order", to: "mq", label: "events" },
		]}
	/>
);

export const PaymentFlowDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Payment Processing Flow"
		nodes={[
			{ id: "client", label: "Client", sublabel: "Checkout", x: 100, y: 140, type: "client" },
			{ id: "api", label: "Payment API", sublabel: "Express", x: 280, y: 140, type: "api" },
			{ id: "validate", label: "Validation", sublabel: "Fraud Check", x: 460, y: 80, type: "service" },
			{ id: "gateway", label: "Stripe/Razorpay", sublabel: "Payment Gateway", x: 460, y: 200, type: "external" },
			{ id: "ledger", label: "Ledger DB", sublabel: "Transactions", x: 640, y: 140, type: "database" },
			{ id: "webhook", label: "Webhook Handler", sublabel: "Status Updates", x: 280, y: 260, type: "api" },
			{ id: "notify", label: "Notifications", sublabel: "Email/SMS", x: 460, y: 260, type: "external" },
		]}
		connections={[
			{ from: "client", to: "api", label: "initiate", animated: true },
			{ from: "api", to: "validate", label: "verify" },
			{ from: "validate", to: "gateway", label: "process" },
			{ from: "gateway", to: "ledger", label: "record" },
			{ from: "gateway", to: "webhook", label: "callback", animated: true },
			{ from: "webhook", to: "notify", label: "confirm" },
		]}
	/>
);

export const DataFlowDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Data Processing Pipeline"
		nodes={[
			{
				id: "source",
				label: "Data Sources",
				sublabel: "APIs/Files/DB",
				x: 100,
				y: 140,
				type: "external",
			},
			{
				id: "ingest",
				label: "Ingestion Layer",
				sublabel: "ETL Service",
				x: 280,
				y: 140,
				type: "service",
			},
			{
				id: "transform",
				label: "Transform",
				sublabel: "Data Processing",
				x: 460,
				y: 80,
				type: "service",
			},
			{
				id: "validate",
				label: "Validation",
				sublabel: "Schema Check",
				x: 460,
				y: 200,
				type: "service",
			},
			{
				id: "warehouse",
				label: "Data Warehouse",
				sublabel: "PostgreSQL",
				x: 640,
				y: 140,
				type: "database",
			},
			{
				id: "cache",
				label: "Query Cache",
				sublabel: "Redis",
				x: 640,
				y: 260,
				type: "cache",
			},
			{
				id: "api",
				label: "Query API",
				sublabel: "GraphQL/REST",
				x: 460,
				y: 320,
				type: "api",
			},
			{
				id: "dashboard",
				label: "Dashboard",
				sublabel: "React",
				x: 280,
				y: 320,
				type: "client",
			},
		]}
		connections={[
			{ from: "source", to: "ingest", label: "pull", animated: true },
			{ from: "ingest", to: "transform", label: "clean" },
			{ from: "ingest", to: "validate", label: "verify" },
			{ from: "transform", to: "warehouse", label: "load" },
			{ from: "validate", to: "warehouse", label: "store" },
			{ from: "warehouse", to: "cache", label: "hot data" },
			{ from: "cache", to: "api", label: "serve" },
			{
				from: "api",
				to: "dashboard",
				label: "visualize",
				animated: true,
			},
		]}
	/>
);

export const EventDrivenDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Event-Driven Architecture"
		nodes={[
			{
				id: "producer1",
				label: "Order Service",
				sublabel: "Producer",
				x: 100,
				y: 80,
				type: "service",
			},
			{
				id: "producer2",
				label: "User Service",
				sublabel: "Producer",
				x: 100,
				y: 200,
				type: "service",
			},
			{
				id: "broker",
				label: "Event Broker",
				sublabel: "Kafka/RabbitMQ",
				x: 320,
				y: 140,
				type: "queue",
			},
			{
				id: "consumer1",
				label: "Notification",
				sublabel: "Consumer",
				x: 540,
				y: 60,
				type: "service",
			},
			{
				id: "consumer2",
				label: "Analytics",
				sublabel: "Consumer",
				x: 540,
				y: 140,
				type: "service",
			},
			{
				id: "consumer3",
				label: "Inventory",
				sublabel: "Consumer",
				x: 540,
				y: 220,
				type: "service",
			},
			{
				id: "store",
				label: "Event Store",
				sublabel: "Append-only Log",
				x: 320,
				y: 280,
				type: "database",
			},
			{
				id: "replay",
				label: "Event Replay",
				sublabel: "Recovery",
				x: 540,
				y: 300,
				type: "service",
			},
		]}
		connections={[
			{
				from: "producer1",
				to: "broker",
				label: "publish",
				animated: true,
			},
			{
				from: "producer2",
				to: "broker",
				label: "publish",
				animated: true,
			},
			{ from: "broker", to: "consumer1", label: "subscribe" },
			{ from: "broker", to: "consumer2", label: "subscribe" },
			{ from: "broker", to: "consumer3", label: "subscribe" },
			{ from: "broker", to: "store", label: "persist" },
			{ from: "store", to: "replay", label: "replay" },
		]}
	/>
);

export const BlockchainDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Blockchain Integration"
		nodes={[
			{
				id: "client",
				label: "Wallet UI",
				sublabel: "React",
				x: 100,
				y: 140,
				type: "client",
			},
			{
				id: "api",
				label: "Backend API",
				sublabel: "Node.js",
				x: 280,
				y: 140,
				type: "api",
			},
			{
				id: "signer",
				label: "TX Signer",
				sublabel: "Secure Enclave",
				x: 460,
				y: 80,
				type: "service",
			},
			{
				id: "node",
				label: "Blockchain Node",
				sublabel: "Bitcoin/ETH",
				x: 640,
				y: 140,
				type: "external",
			},
			{
				id: "indexer",
				label: "TX Indexer",
				sublabel: "Event Listener",
				x: 460,
				y: 200,
				type: "service",
			},
			{
				id: "db",
				label: "Local DB",
				sublabel: "PostgreSQL",
				x: 280,
				y: 260,
				type: "database",
			},
			{
				id: "cache",
				label: "Balance Cache",
				sublabel: "Redis",
				x: 460,
				y: 280,
				type: "cache",
			},
		]}
		connections={[
			{ from: "client", to: "api", label: "request", animated: true },
			{ from: "api", to: "signer", label: "sign" },
			{ from: "signer", to: "node", label: "broadcast", animated: true },
			{ from: "node", to: "indexer", label: "events" },
			{ from: "indexer", to: "db", label: "store" },
			{ from: "indexer", to: "cache", label: "update" },
			{ from: "api", to: "cache", label: "read" },
		]}
	/>
);

export const ContainerDiagram: React.FC = () => (
	<ArchitectureDiagram
		title="Container Orchestration"
		nodes={[
			{
				id: "registry",
				label: "Container Registry",
				sublabel: "Docker Hub",
				x: 100,
				y: 140,
				type: "external",
			},
			{
				id: "k8s",
				label: "Kubernetes",
				sublabel: "Orchestrator",
				x: 320,
				y: 140,
				type: "service",
			},
			{
				id: "pod1",
				label: "API Pods",
				sublabel: "Replicas: 3",
				x: 540,
				y: 60,
				type: "service",
			},
			{
				id: "pod2",
				label: "Worker Pods",
				sublabel: "Replicas: 2",
				x: 540,
				y: 140,
				type: "service",
			},
			{
				id: "pod3",
				label: "Cron Jobs",
				sublabel: "Scheduled",
				x: 540,
				y: 220,
				type: "service",
			},
			{
				id: "ingress",
				label: "Ingress/LB",
				sublabel: "NGINX",
				x: 320,
				y: 280,
				type: "api",
			},
			{
				id: "monitor",
				label: "Monitoring",
				sublabel: "Prometheus",
				x: 540,
				y: 300,
				type: "external",
			},
		]}
		connections={[
			{ from: "registry", to: "k8s", label: "pull", animated: true },
			{ from: "k8s", to: "pod1", label: "deploy" },
			{ from: "k8s", to: "pod2", label: "deploy" },
			{ from: "k8s", to: "pod3", label: "schedule" },
			{ from: "ingress", to: "pod1", label: "route" },
			{ from: "pod1", to: "monitor", label: "metrics" },
			{ from: "pod2", to: "monitor", label: "metrics" },
		]}
	/>
);

export default ArchitectureDiagram;
