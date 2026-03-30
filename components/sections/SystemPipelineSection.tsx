import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
	useScroll as useScrollMotion,
	useTransform as useTransformMotion,
} from "motion/react";

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
export const FullDiagram = () => {
	const ref = useRef(null);
	const { scrollYProgress } = useScrollMotion({
		target: ref,
		offset: ["start start", "end start"],
	});

	const pathLengthFirst = useTransformMotion(
		scrollYProgress,
		[0, 0.8],
		[0.2, 1.2],
	);
	const pathLengthSecond = useTransformMotion(
		scrollYProgress,
		[0, 0.8],
		[0.15, 1.2],
	);
	const pathLengthThird = useTransformMotion(
		scrollYProgress,
		[0, 0.8],
		[0.1, 1.2],
	);
	const pathLengthFourth = useTransformMotion(
		scrollYProgress,
		[0, 0.8],
		[0.05, 1.2],
	);
	const pathLengthFifth = useTransformMotion(
		scrollYProgress,
		[0, 0.8],
		[0, 1.2],
	);

	return (
		<div ref={ref} className="relative">
			<svg
				// viewBox="0 0 3200 700"
				className="w-[3200px] h-[500px]"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					minWidth: "3200px",
					objectFit: "contain",
					objectPosition: "center",
				}}
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
				<rect width="3200" height="420" fill="url(#grid)" />

				{/* ─── LAYER 1: High-level system overview (left) ─── */}
				{/* Main system box */}
				<rect
					x={40}
					y={60}
					width={700}
					height={420}
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
					height={420}
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
					height={420}
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
					height={420}
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
			</svg>
		</div>
	);
};

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
