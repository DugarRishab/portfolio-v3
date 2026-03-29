import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── SVG Diagram Nodes ──────────────────────────────────────────────
const DiagramNode = ({
	x,
	y,
	w,
	h,
	label,
	sublabel,
	variant = "default",
}: {
	x: number;
	y: number;
	w: number;
	h: number;
	label: string;
	sublabel?: string;
	variant?: "default" | "primary" | "accent" | "muted";
}) => {
	const fills: Record<string, string> = {
		default: "rgba(255,255,255,0.04)",
		primary: "rgba(160,100,255,0.12)",
		accent: "rgba(230,140,40,0.12)",
		muted: "rgba(255,255,255,0.02)",
	};
	const strokes: Record<string, string> = {
		default: "rgba(255,255,255,0.1)",
		primary: "rgba(160,100,255,0.5)",
		accent: "rgba(230,140,40,0.4)",
		muted: "rgba(255,255,255,0.06)",
	};
	const textColors: Record<string, string> = {
		default: "rgba(255,255,255,0.8)",
		primary: "rgba(190,150,255,1)",
		accent: "rgba(240,170,80,1)",
		muted: "rgba(255,255,255,0.4)",
	};

	return (
		<g>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				rx={6}
				fill={fills[variant]}
				stroke={strokes[variant]}
				strokeWidth={1.5}
			/>
			<text
				x={x + w / 2}
				y={y + (sublabel ? h / 2 - 6 : h / 2 + 1)}
				textAnchor="middle"
				dominantBaseline="middle"
				fill={textColors[variant]}
				fontSize={14}
				fontWeight={600}
				fontFamily="monospace"
			>
				{label}
			</text>
			{sublabel && (
				<text
					x={x + w / 2}
					y={y + h / 2 + 12}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="rgba(255,255,255,0.3)"
					fontSize={10}
					fontFamily="monospace"
				>
					{sublabel}
				</text>
			)}
		</g>
	);
};

const FlowLine = ({ d, delay = 0 }) => (
	<>
		<path
			d={d}
			fill="none"
			stroke="rgba(255,255,255,0.08)"
			strokeWidth={1}
		/>
		<motion.circle
			r={2}
			fill="rgba(160,100,255,0.8)"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{
				duration: 2,
				delay,
				repeat: Infinity,
				ease: "linear",
			}}
			style={{
				offsetPath: `path("${d}")`,
				offsetDistance: "0%",
			}}
		/>
	</>
);

// Arrow marker
const ArrowDot = ({
	cx,
	cy,
	color = "rgba(160,100,255,0.6)",
}: {
	cx: number;
	cy: number;
	color?: string;
}) => (
	<circle cx={cx} cy={cy} r={3} fill={color}>
		<animate
			attributeName="opacity"
			values="0.4;1;0.4"
			dur="2s"
			repeatCount="indefinite"
		/>
	</circle>
);

// ── The Full Diagram (very wide, multi-layer) ──────────────────────
export const FullDiagram = () => (
	<svg
		// viewBox="0 0 3200 700"
		className="w-[3200px] h-[700px]"
		xmlns="http://www.w3.org/2000/svg"
		style={{ minWidth: "3200px", objectFit: "contain", objectPosition: "center" }}
	>
		{/* Grid pattern */}
		<defs>
			<pattern
				id="grid"
				width="40"
				height="40"
				patternUnits="userSpaceOnUse"
			>
				<path
					d="M 40 0 L 0 0 0 40"
					fill="none"
					stroke="rgba(255,255,255,0.02)"
					strokeWidth="0.5"
				/>
			</pattern>
		</defs>
		<rect width="3200" height="700" fill="url(#grid)" />

		{/* ─── LAYER 1: High-level system overview (left) ─── */}
		{/* Main system box */}
		<rect
			x={40}
			y={60}
			width={700}
			height={580}
			rx={12}
			fill="rgba(255,255,255,0.01)"
			stroke="rgba(255,255,255,0.05)"
			strokeWidth={1}
			strokeDasharray="4 4"
		/>
		<text
			x={60}
			y={90}
			fill="rgba(255,255,255,1)"
			fontSize={11}
			fontFamily="monospace"
			letterSpacing={3}
		>
			SYSTEM OVERVIEW
		</text>

		<DiagramNode
			x={80}
			y={140}
			w={200}
			h={70}
			label="AI Agents"
			sublabel="decision engine"
			variant="primary"
		/>
		<DiagramNode
			x={80}
			y={280}
			w={200}
			h={70}
			label="Data Ingest"
			sublabel="ETL pipeline"
			variant="muted"
		/>
		<DiagramNode
			x={80}
			y={420}
			w={200}
			h={70}
			label="Monitoring"
			sublabel="observability"
			variant="muted"
		/>

		<DiagramNode
			x={400}
			y={200}
			w={220}
			h={80}
			label="Orchestrator"
			sublabel="workflow engine"
			variant="accent"
		/>
		<DiagramNode
			x={400}
			y={370}
			w={220}
			h={80}
			label="Event Bus"
			sublabel="message queue"
			variant="muted"
		/>

		{/* Layer 1 connections */}
		<FlowLine d="M 280 175 L 400 230" delay={0} />
		<FlowLine d="M 280 315 L 400 250" delay={0.3} />
		<FlowLine d="M 280 455 L 400 420" delay={0.6} />
		<FlowLine d="M 510 280 L 510 370" delay={0.2} />

		<ArrowDot cx={400} cy={230} />
		<ArrowDot cx={400} cy={250} />
		<ArrowDot cx={400} cy={420} color="rgba(230,140,40,0.6)" />

		{/* ─── Transition zone ─── */}
		<FlowLine d="M 620 240 L 820 200" delay={0.5} />
		<FlowLine d="M 620 410 L 820 350" delay={0.7} />
		<ArrowDot cx={820} cy={200} />

		{/* ─── LAYER 2: Automation internals ─── */}
		<rect
			x={780}
			y={60}
			width={700}
			height={580}
			rx={12}
			fill="rgba(255,255,255,0.01)"
			stroke="rgba(160,100,255,0.08)"
			strokeWidth={1}
			strokeDasharray="4 4"
		/>
		<text
			x={800}
			y={90}
			fill="rgba(160,100,255,1)"
			fontSize={11}
			fontFamily="monospace"
			letterSpacing={3}
		>
			AUTOMATION LAYER
		</text>

		<DiagramNode
			x={820}
			y={140}
			w={180}
			h={60}
			label="Task Queue"
			sublabel="priority scheduler"
			variant="primary"
		/>
		<DiagramNode
			x={820}
			y={260}
			w={180}
			h={60}
			label="Worker Pool"
			sublabel="n=16 threads"
			variant="default"
		/>
		<DiagramNode
			x={820}
			y={380}
			w={180}
			h={60}
			label="State Store"
			sublabel="Redis cluster"
			variant="muted"
		/>

		<DiagramNode
			x={1100}
			y={140}
			w={180}
			h={60}
			label="Validator"
			sublabel="schema check"
			variant="default"
		/>
		<DiagramNode
			x={1100}
			y={260}
			w={180}
			h={60}
			label="Transform"
			sublabel="data pipeline"
			variant="accent"
		/>
		<DiagramNode
			x={1100}
			y={380}
			w={180}
			h={60}
			label="Logger"
			sublabel="structured logs"
			variant="muted"
		/>

		<DiagramNode
			x={1340}
			y={200}
			w={120}
			h={140}
			label="Deploy"
			sublabel="CI/CD"
			variant="primary"
		/>

		<FlowLine d="M 1000 170 L 1100 170" delay={0.1} />
		<FlowLine d="M 1000 290 L 1100 290" delay={0.4} />
		<FlowLine d="M 1000 410 L 1100 410" delay={0.7} />
		<FlowLine d="M 1280 170 L 1340 240" delay={0.2} />
		<FlowLine d="M 1280 290 L 1340 270" delay={0.5} />
		<FlowLine d="M 910 200 L 910 260" delay={0.3} />
		<FlowLine d="M 910 320 L 910 380" delay={0.6} />

		<ArrowDot cx={1100} cy={170} />
		<ArrowDot cx={1100} cy={290} color="rgba(230,140,40,0.6)" />
		<ArrowDot cx={1340} cy={240} />

		{/* ─── Transition zone ─── */}
		<FlowLine d="M 1460 270 L 1580 220" delay={0.3} />
		<FlowLine d="M 1460 340 L 1580 380" delay={0.5} />

		{/* ─── LAYER 3: Backend microservices ─── */}
		<rect
			x={1540}
			y={60}
			width={700}
			height={580}
			rx={12}
			fill="rgba(255,255,255,0.01)"
			stroke="rgba(230,140,40,0.08)"
			strokeWidth={1}
			strokeDasharray="4 4"
		/>
		<text
			x={1560}
			y={90}
			fill="rgba(230,140,40,1)"
			fontSize={11}
			fontFamily="monospace"
			letterSpacing={3}
		>
			BACKEND SERVICES
		</text>

		<DiagramNode
			x={1580}
			y={130}
			w={160}
			h={55}
			label="Auth Service"
			sublabel="JWT + OAuth"
			variant="default"
		/>
		<DiagramNode
			x={1580}
			y={230}
			w={160}
			h={55}
			label="API Gateway"
			sublabel="rate limiting"
			variant="accent"
		/>
		<DiagramNode
			x={1580}
			y={330}
			w={160}
			h={55}
			label="GraphQL"
			sublabel="federation"
			variant="default"
		/>
		<DiagramNode
			x={1580}
			y={430}
			w={160}
			h={55}
			label="Storage"
			sublabel="S3 compatible"
			variant="muted"
		/>

		<DiagramNode
			x={1840}
			y={130}
			w={160}
			h={55}
			label="Users DB"
			sublabel="PostgreSQL"
			variant="primary"
		/>
		<DiagramNode
			x={1840}
			y={230}
			w={160}
			h={55}
			label="Cache"
			sublabel="Redis L2"
			variant="muted"
		/>
		<DiagramNode
			x={1840}
			y={330}
			w={160}
			h={55}
			label="Search"
			sublabel="Elasticsearch"
			variant="default"
		/>
		<DiagramNode
			x={1840}
			y={430}
			w={160}
			h={55}
			label="CDN"
			sublabel="edge cache"
			variant="muted"
		/>

		<DiagramNode
			x={2080}
			y={240}
			w={140}
			h={100}
			label="Load"
			sublabel="Balancer"
			variant="accent"
		/>

		<FlowLine d="M 1740 157 L 1840 157" delay={0} />
		<FlowLine d="M 1740 257 L 1840 257" delay={0.2} />
		<FlowLine d="M 1740 357 L 1840 357" delay={0.4} />
		<FlowLine d="M 1740 457 L 1840 457" delay={0.6} />
		<FlowLine d="M 2000 157 L 2080 270" delay={0.3} />
		<FlowLine d="M 2000 257 L 2080 280" delay={0.5} />
		<FlowLine d="M 2000 357 L 2080 300" delay={0.7} />
		<FlowLine d="M 1660 185 L 1660 230" delay={0.1} />
		<FlowLine d="M 1660 285 L 1660 330" delay={0.3} />
		<FlowLine d="M 1660 385 L 1660 430" delay={0.5} />

		<ArrowDot cx={1840} cy={157} />
		<ArrowDot cx={1840} cy={257} color="rgba(230,140,40,0.6)" />
		<ArrowDot cx={2080} cy={270} color="rgba(230,140,40,0.6)" />

		{/* ─── Transition zone ─── */}
		<FlowLine d="M 2220 290 L 2380 240" delay={0.4} />

		{/* ─── LAYER 4: Frontend delivery ─── */}
		<rect
			x={2340}
			y={60}
			width={700}
			height={580}
			rx={12}
			fill="rgba(255,255,255,0.01)"
			stroke="rgba(160,100,255,0.06)"
			strokeWidth={1}
			strokeDasharray="4 4"
		/>
		<text
			x={2360}
			y={90}
			fill="rgba(160,100,255,1)"
			fontSize={11}
			fontFamily="monospace"
			letterSpacing={3}
		>
			FRONTEND DELIVERY
		</text>

		<DiagramNode
			x={2380}
			y={140}
			w={180}
			h={55}
			label="SSR Engine"
			sublabel="Next.js / Vite"
			variant="primary"
		/>
		<DiagramNode
			x={2380}
			y={250}
			w={180}
			h={55}
			label="Component Lib"
			sublabel="design system"
			variant="default"
		/>
		<DiagramNode
			x={2380}
			y={360}
			w={180}
			h={55}
			label="State Mgmt"
			sublabel="React Query"
			variant="muted"
		/>
		<DiagramNode
			x={2380}
			y={470}
			w={180}
			h={55}
			label="Analytics"
			sublabel="telemetry SDK"
			variant="muted"
		/>

		<DiagramNode
			x={2660}
			y={140}
			w={160}
			h={55}
			label="App Shell"
			sublabel="layout + nav"
			variant="default"
		/>
		<DiagramNode
			x={2660}
			y={250}
			w={160}
			h={55}
			label="Dashboard"
			sublabel="data views"
			variant="accent"
		/>
		<DiagramNode
			x={2660}
			y={360}
			w={160}
			h={55}
			label="Forms"
			sublabel="validation"
			variant="default"
		/>
		<DiagramNode
			x={2660}
			y={470}
			w={160}
			h={55}
			label="Real-time"
			sublabel="WebSocket"
			variant="primary"
		/>

		<FlowLine d="M 2560 167 L 2660 167" delay={0.1} />
		<FlowLine d="M 2560 277 L 2660 277" delay={0.3} />
		<FlowLine d="M 2560 387 L 2660 387" delay={0.5} />
		<FlowLine d="M 2560 497 L 2660 497" delay={0.7} />
		<FlowLine d="M 2470 195 L 2470 250" delay={0.2} />
		<FlowLine d="M 2470 305 L 2470 360" delay={0.4} />
		<FlowLine d="M 2470 415 L 2470 470" delay={0.6} />

		<ArrowDot cx={2660} cy={167} />
		<ArrowDot cx={2660} cy={277} color="rgba(230,140,40,0.6)" />
		<ArrowDot cx={2660} cy={497} />

		{/* Final output arrow */}
		<FlowLine d="M 2820 277 L 2920 277" delay={0.2} />
		<DiagramNode
			x={2920}
			y={240}
			w={140}
			h={75}
			label="🖥️ Users"
			sublabel="production"
			variant="primary"
		/>

		{/* Floating labels for depth perception */}
		<text
			x={390}
			y={560}
			fill="rgba(255,255,255,0.1)"
			fontSize={48}
			fontWeight={700}
			fontFamily="monospace"
		>
			01
		</text>
		<text
			x={1130}
			y={560}
			fill="rgba(160,100,255,0.06)"
			fontSize={48}
			fontWeight={700}
			fontFamily="monospace"
		>
			02
		</text>
		<text
			x={1880}
			y={560}
			fill="rgba(230,140,40,0.06)"
			fontSize={48}
			fontWeight={700}
			fontFamily="monospace"
		>
			03
		</text>
		<text
			x={2640}
			y={560}
			fill="rgba(160,100,255,0.05)"
			fontSize={48}
			fontWeight={700}
			fontFamily="monospace"
		>
			04
		</text>
	</svg>
);

const LayerBox = ({ x, title, color }) => (
	<>
		<rect
			x={x}
			y={60}
			width={420}
			height={480}
			rx={12}
			fill="rgba(255,255,255,0.01)"
			stroke={color}
			strokeDasharray="4 4"
		/>
		<text
			x={x + 20}
			y={90}
			fill={color}
			fontSize={11}
			fontFamily="monospace"
			letterSpacing={2}
		>
			{title}
		</text>
	</>
);

const Node = ({ x, y, w = 160, h = 60, label, sub, primary, accent }) => {
	const stroke = primary
		? "rgba(160,100,255,0.6)"
		: accent
			? "rgba(230,140,40,0.6)"
			: "rgba(255,255,255,0.15)";

	return (
		<>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				rx={10}
				fill="rgba(255,255,255,0.02)"
				stroke={stroke}
			/>
			<text x={x + 12} y={y + 26} fill="white" fontSize={12}>
				{label}
			</text>
			<text
				x={x + 12}
				y={y + 44}
				fill="rgba(255,255,255,0.4)"
				fontSize={10}
			>
				{sub}
			</text>
		</>
	);
};

const Line = ({ d }) => (
	<path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1.2} />
);

export const FullDiagram2 = () => (
	<svg
		viewBox="0 0 2600 600"
		className="w-[2600px] h-[600px]"
		xmlns="http://www.w3.org/2000/svg"
		style={{ minWidth: "2600px" }}
	>
		{/* Background grid */}
		<defs>
			<pattern
				id="grid"
				width="40"
				height="40"
				patternUnits="userSpaceOnUse"
			>
				<path
					d="M 40 0 L 0 0 0 40"
					fill="none"
					stroke="rgba(255,255,255,0.02)"
					strokeWidth="0.5"
				/>
			</pattern>
		</defs>
		<rect width="2600" height="600" fill="url(#grid)" />

		{/* ===== LAYER 1: INPUT ===== */}
		<LayerBox x={40} title="INPUT SOURCES" color="rgba(255,255,255,0.05)" />

		<DiagramNode x={80} y={140} label="APIs" sub_label="3rd party data" />
		<DiagramNode x={80} y={260} label="Scrapers" sub_label="web / maps / social" />
		<DiagramNode x={80} y={380} label="User Input" sub_label="forms / triggers" />

		{/* ===== LAYER 2: AUTOMATION ===== */}
		<LayerBox x={520} title="AUTOMATION" color="rgba(160,100,255,0.08)" />

		<DiagramNode x={560} y={140} label="Workflows" sub_label="n8n / logic" primary />
		<DiagramNode x={560} y={260} label="Queues" sub_label="async jobs" />
		<DiagramNode x={560} y={380} label="Storage" sub_label="db / cache" />

		<DiagramNode x={780} y={200} label="Transform" sub_label="clean / enrich" accent />
		<DiagramNode x={780} y={340} label="Validation" sub_label="rules / filters" />

		{/* ===== LAYER 3: INTELLIGENCE ===== */}
		<LayerBox
			x={1040}
			title="AI + DECISION"
			color="rgba(230,140,40,0.08)"
		/>

		<DiagramNode
			x={1080}
			y={160}
			label="LLM Layer"
			sub_label="reasoning / generation"
			primary
		/>
		<DiagramNode x={1080} y={300} label="Agents" sub_label="task execution" accent />

		<DiagramNode x={1300} y={230} label="Decision Engine" sub_label="rules + AI" />

		{/* ===== LAYER 4: BACKEND ===== */}
		<LayerBox x={1560} title="APPLICATION" color="rgba(255,255,255,0.05)" />

		<DiagramNode x={1600} y={160} label="API Layer" sub_label="routes / logic" />
		<DiagramNode x={1600} y={300} label="Database" sub_label="persistent state" />

		<DiagramNode x={1820} y={230} label="Services" sub_label="modular logic" accent />

		{/* ===== LAYER 5: DELIVERY ===== */}
		<LayerBox x={2080} title="DELIVERY" color="rgba(160,100,255,0.06)" />

		<DiagramNode x={2120} y={160} label="Frontend" sub_label="React / Next" primary />
		<DiagramNode x={2120} y={300} label="Dashboards" sub_label="data views" />
		<DiagramNode x={2120} y={440} label="APIs" sub_label="external access" />

		{/* ===== FLOW LINES ===== */}

		{/* Input → Automation */}
		<Line d="M 240 180 L 520 180" />
		<Line d="M 240 300 L 520 300" />
		<Line d="M 240 420 L 520 420" />

		{/* Automation internal */}
		<Line d="M 740 170 L 780 220" />
		<Line d="M 740 290 L 780 340" />

		{/* Automation → AI */}
		<Line d="M 900 250 L 1040 250" />

		{/* AI internal */}
		<Line d="M 1240 200 L 1300 260" />
		<Line d="M 1240 340 L 1300 260" />

		{/* AI → Backend */}
		<Line d="M 1440 260 L 1560 260" />

		{/* Backend internal */}
		<Line d="M 1760 200 L 1820 260" />
		<Line d="M 1760 340 L 1820 260" />

		{/* Backend → Delivery */}
		<Line d="M 1960 260 L 2080 260" />

		{/* Final output */}
		<DiagramNode
			x={2380}
			y={240}
			w={140}
			h={80}
			label="Users"
			sublabel="end result"
			primary
		/>
	</svg>
);
// ── Main Section ───────────────────────────────────────────────────
const SystemPipelineSection = () => {
	return (
		<div className="relative h-[100vh]">
			{/* Static header - no parallax */}
			<div className="relative z-10 px-8 md:px-16 pt-12 pb-8">
				{/* Depth indicator */}
			</div>
		</div>
	);
};

export default SystemPipelineSection;
