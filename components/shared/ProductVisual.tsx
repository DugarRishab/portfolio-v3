import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

// ============================================================================
// COLOR TOKENS (STRICT)
// ============================================================================
const COLORS = {
	primary: "#a855f7",
	primaryLight: "#d8b4fe",
	secondary: "#9CA3AF",
	primaryAlpha: (alpha: number) => `rgba(168, 85, 247, ${alpha})`,
	secondaryAlpha: (alpha: number) => `rgba(156, 163, 175, ${alpha})`,
} as const;

// ============================================================================
// SHARED ANIMATION PRIMITIVES
// ============================================================================
const SPRING_CONFIG = {
	hover: { type: "spring" as const, stiffness: 120, damping: 14 },
	gentle: { type: "spring" as const, stiffness: 80, damping: 12 },
};

const containerVariants: Variants = {
	idle: { rotateX: 0, rotateY: 0, scale: 1 },
	hover: { rotateX: 8, rotateY: -8, scale: 1.04 },
};

// ============================================================================
// SHARED SVG PRIMITIVES
// ============================================================================
interface NodeProps {
	cx: number;
	cy: number;
	r?: number;
	delay?: number;
	pulseDelay?: number;
}

const Node: React.FC<NodeProps> = ({ cx, cy, r = 3, delay = 0, pulseDelay = 0 }) => (
	<motion.circle
		cx={cx}
		cy={cy}
		r={r}
		fill={COLORS.primary}
		stroke={COLORS.primaryAlpha(0.5)}
		strokeWidth={1}
		initial={{ opacity: 0, scale: 0 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ delay, duration: 0.3 }}
	>
		<animate
			attributeName="opacity"
			values="0.6;1;0.6"
			dur="2.5s"
			begin={`${pulseDelay}s`}
			repeatCount="indefinite"
		/>
	</motion.circle>
);

interface LineProps {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	delay?: number;
	dashed?: boolean;
}

const Line: React.FC<LineProps> = ({ x1, y1, x2, y2, delay = 0, dashed = false }) => (
	<motion.line
		x1={x1}
		y1={y1}
		x2={x2}
		y2={y2}
		stroke={COLORS.primaryAlpha(0.4)}
		strokeWidth={1}
		strokeDasharray={dashed ? "3 3" : undefined}
		initial={{ pathLength: 0, opacity: 0 }}
		animate={{ pathLength: 1, opacity: 1 }}
		transition={{ delay, duration: 0.5 }}
	/>
);

interface FlowParticleProps {
	path: string;
	duration?: number;
	delay?: number;
}

const FlowParticle: React.FC<FlowParticleProps> = ({ path, duration = 3, delay = 0 }) => (
	<motion.circle r={2} fill={COLORS.primary}>
		<animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
			<mpath href={`#${path}`} />
		</animateMotion>
		<animate
			attributeName="opacity"
			values="0;1;1;0"
			dur={`${duration}s`}
			begin={`${delay}s`}
			repeatCount="indefinite"
		/>
	</motion.circle>
);

// ============================================================================
// VARIANT: DATA-FLOW (Level 2 - Structured Systems)
// Flowing curved paths + moving particles, directional motion
// Elements: 8-12
// ============================================================================
const DataFlowVariant: React.FC = () => (
	<g>
		{/* Flow paths */}
		<defs>
			<path
				id="flowPath1"
				d="M 20 60 Q 60 30, 100 60 T 180 60"
				fill="none"
			/>
			<path
				id="flowPath2"
				d="M 20 100 Q 60 130, 100 100 T 180 100"
				fill="none"
			/>
			<path
				id="flowPath3"
				d="M 100 20 L 100 140"
				fill="none"
			/>
		</defs>

		{/* Curved flow lines */}
		<motion.path
			d="M 20 60 Q 60 30, 100 60 T 180 60"
			fill="none"
			stroke={COLORS.primaryAlpha(0.3)}
			strokeWidth={1}
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.8 }}
		/>
		<motion.path
			d="M 20 100 Q 60 130, 100 100 T 180 100"
			fill="none"
			stroke={COLORS.primaryAlpha(0.3)}
			strokeWidth={1}
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		/>

		{/* Vertical connector */}
		<motion.line
			x1={100}
			y1={40}
			x2={100}
			y2={120}
			stroke={COLORS.primaryAlpha(0.2)}
			strokeWidth={1}
			strokeDasharray="4 4"
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.6, delay: 0.4 }}
		/>

		{/* Nodes at key points */}
		<Node cx={20} cy={60} delay={0.3} pulseDelay={0} />
		<Node cx={100} cy={60} r={4} delay={0.4} pulseDelay={0.3} />
		<Node cx={180} cy={60} delay={0.5} pulseDelay={0.6} />
		<Node cx={20} cy={100} delay={0.35} pulseDelay={0.2} />
		<Node cx={100} cy={100} r={4} delay={0.45} pulseDelay={0.5} />
		<Node cx={180} cy={100} delay={0.55} pulseDelay={0.8} />

		{/* Flow particles */}
		<FlowParticle path="flowPath1" duration={2.5} delay={0} />
		<FlowParticle path="flowPath2" duration={2.8} delay={0.5} />
		<FlowParticle path="flowPath1" duration={2.5} delay={1.2} />
	</g>
);

// ============================================================================
// VARIANT: NETWORK (Level 2 - Structured Systems)
// Grid or graph structure, stable connected nodes
// Elements: 8-12
// ============================================================================
const NetworkVariant: React.FC = () => {
	const nodes = [
		{ x: 100, y: 40, r: 4 },
		{ x: 50, y: 80, r: 3 },
		{ x: 150, y: 80, r: 3 },
		{ x: 30, y: 120, r: 3 },
		{ x: 80, y: 120, r: 3 },
		{ x: 120, y: 120, r: 3 },
		{ x: 170, y: 120, r: 3 },
	];

	const connections = [
		[0, 1], [0, 2],
		[1, 3], [1, 4],
		[2, 5], [2, 6],
		[4, 5],
	];

	return (
		<g>
			{/* Connection lines */}
			{connections.map(([from, to], i) => (
				<Line
					key={`conn-${i}`}
					x1={nodes[from].x}
					y1={nodes[from].y}
					x2={nodes[to].x}
					y2={nodes[to].y}
					delay={0.1 + i * 0.08}
				/>
			))}

			{/* Nodes */}
			{nodes.map((node, i) => (
				<Node
					key={`node-${i}`}
					cx={node.x}
					cy={node.y}
					r={node.r}
					delay={0.2 + i * 0.1}
					pulseDelay={i * 0.2}
				/>
			))}

			{/* Subtle grid background */}
			<motion.rect
				x={20}
				y={30}
				width={160}
				height={110}
				fill="none"
				stroke={COLORS.primaryAlpha(0.08)}
				strokeWidth={1}
				rx={4}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
			/>
		</g>
	);
};

// ============================================================================
// VARIANT: AUTOMATION (Level 2 - Structured Systems)
// Loops, cycles, repeating motion, circular/orbital feel
// Elements: 8-12
// ============================================================================
const AutomationVariant: React.FC = () => (
	<g>
		{/* Orbital paths */}
		<defs>
			<path
				id="orbitPath1"
				d="M 100 80 m -50 0 a 50 30 0 1 1 100 0 a 50 30 0 1 1 -100 0"
				fill="none"
			/>
			<path
				id="orbitPath2"
				d="M 100 80 m -30 0 a 30 18 0 1 1 60 0 a 30 18 0 1 1 -60 0"
				fill="none"
			/>
		</defs>

		{/* Outer orbit ring */}
		<motion.ellipse
			cx={100}
			cy={80}
			rx={50}
			ry={30}
			fill="none"
			stroke={COLORS.primaryAlpha(0.25)}
			strokeWidth={1}
			initial={{ pathLength: 0, opacity: 0 }}
			animate={{ pathLength: 1, opacity: 1 }}
			transition={{ duration: 1 }}
		/>

		{/* Inner orbit ring */}
		<motion.ellipse
			cx={100}
			cy={80}
			rx={30}
			ry={18}
			fill="none"
			stroke={COLORS.primaryAlpha(0.2)}
			strokeWidth={1}
			initial={{ pathLength: 0, opacity: 0 }}
			animate={{ pathLength: 1, opacity: 1 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		/>

		{/* Center node */}
		<motion.circle
			cx={100}
			cy={80}
			r={6}
			fill={COLORS.primaryAlpha(0.15)}
			stroke={COLORS.primary}
			strokeWidth={1.5}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ delay: 0.4, type: "spring" }}
		>
			<animate
				attributeName="opacity"
				values="0.8;1;0.8"
				dur="2s"
				repeatCount="indefinite"
			/>
		</motion.circle>

		{/* Orbiting particles on outer ring */}
		<motion.circle r={3} fill={COLORS.primary}>
			<animateMotion dur="4s" repeatCount="indefinite">
				<mpath href="#orbitPath1" />
			</animateMotion>
		</motion.circle>
		<motion.circle r={2.5} fill={COLORS.primaryLight}>
			<animateMotion dur="4s" repeatCount="indefinite" begin="2s">
				<mpath href="#orbitPath1" />
			</animateMotion>
		</motion.circle>

		{/* Orbiting particles on inner ring */}
		<motion.circle r={2} fill={COLORS.primary}>
			<animateMotion dur="2.5s" repeatCount="indefinite">
				<mpath href="#orbitPath2" />
			</animateMotion>
		</motion.circle>

		{/* Cycle arrows (subtle) */}
		<motion.path
			d="M 155 80 l 5 -4 l 0 8 z"
			fill={COLORS.primaryAlpha(0.4)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1 }}
		/>
		<motion.path
			d="M 45 80 l -5 4 l 0 -8 z"
			fill={COLORS.primaryAlpha(0.4)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1.1 }}
		/>
	</g>
);

// ============================================================================
// VARIANT: CONTAINERS (Level 3 - Pseudo-3D)
// 2D or isometric grid (2x3 blocks), modular infrastructure
// Elements: 10-16
// ============================================================================
const ContainersVariant: React.FC = () => {
	const boxWidth = 40;
	const boxHeight = 28;
	const depthOffset = 6;
	const gap = 8;

	const containers = [
		{ row: 0, col: 0 },
		{ row: 0, col: 1 },
		{ row: 0, col: 2 },
		{ row: 1, col: 0 },
		{ row: 1, col: 1 },
		{ row: 1, col: 2 },
	];

	const getContainerPos = (row: number, col: number) => ({
		x: 30 + col * (boxWidth + gap),
		y: 40 + row * (boxHeight + gap + depthOffset),
	});

	return (
		<g>
			{containers.map(({ row, col }, i) => {
				const { x, y } = getContainerPos(row, col);
				const delay = 0.1 + i * 0.08;

				return (
					<motion.g
						key={`container-${i}`}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay, duration: 0.4 }}
					>
						{/* Depth face (right side) */}
						<motion.path
							d={`M ${x + boxWidth} ${y} 
								 L ${x + boxWidth + depthOffset} ${y - depthOffset} 
								 L ${x + boxWidth + depthOffset} ${y + boxHeight - depthOffset} 
								 L ${x + boxWidth} ${y + boxHeight} Z`}
							fill={COLORS.primaryAlpha(0.08)}
							stroke={COLORS.primaryAlpha(0.3)}
							strokeWidth={1}
						/>

						{/* Depth face (top) */}
						<motion.path
							d={`M ${x} ${y} 
								 L ${x + depthOffset} ${y - depthOffset} 
								 L ${x + boxWidth + depthOffset} ${y - depthOffset} 
								 L ${x + boxWidth} ${y} Z`}
							fill={COLORS.primaryAlpha(0.12)}
							stroke={COLORS.primaryAlpha(0.3)}
							strokeWidth={1}
						/>

						{/* Front face */}
						<motion.rect
							x={x}
							y={y}
							width={boxWidth}
							height={boxHeight}
							fill={COLORS.primaryAlpha(0.06)}
							stroke={COLORS.primaryAlpha(0.5)}
							strokeWidth={1}
							rx={2}
						/>

						{/* Status indicator */}
						<motion.circle
							cx={x + boxWidth - 6}
							cy={y + 6}
							r={2}
							fill={COLORS.primary}
						>
							<animate
								attributeName="opacity"
								values="0.5;1;0.5"
								dur="2s"
								begin={`${i * 0.3}s`}
								repeatCount="indefinite"
							/>
						</motion.circle>

						{/* Container lines (detail) */}
						<motion.line
							x1={x + 5}
							y1={y + boxHeight / 2}
							x2={x + boxWidth - 10}
							y2={y + boxHeight / 2}
							stroke={COLORS.primaryAlpha(0.2)}
							strokeWidth={1}
						/>
					</motion.g>
				);
			})}

			{/* Base platform line */}
			<motion.line
				x1={25}
				y1={135}
				x2={175}
				y2={135}
				stroke={COLORS.secondaryAlpha(0.3)}
				strokeWidth={1}
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ delay: 0.8, duration: 0.5 }}
			/>

			{/* Connection dots between rows */}
			<motion.circle
				cx={50 + boxWidth / 2}
				cy={40 + boxHeight + gap / 2 + depthOffset / 2}
				r={1.5}
				fill={COLORS.primaryAlpha(0.4)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9 }}
			/>
			<motion.circle
				cx={98 + boxWidth / 2}
				cy={40 + boxHeight + gap / 2 + depthOffset / 2}
				r={1.5}
				fill={COLORS.primaryAlpha(0.4)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			/>
		</g>
	);
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type ProductVisualVariant = "data-flow" | "network" | "automation" | "containers";

interface ProductVisualProps {
	variant: ProductVisualVariant;
	className?: string;
}

const variantComponents: Record<ProductVisualVariant, React.FC> = {
	"data-flow": DataFlowVariant,
	network: NetworkVariant,
	automation: AutomationVariant,
	containers: ContainersVariant,
};

const ProductVisual: React.FC<ProductVisualProps> = ({ variant, className = "" }) => {
	const [isHovered, setIsHovered] = useState(false);
	const VariantComponent = variantComponents[variant];

	return (
		<motion.div
			className={`relative w-full h-full flex items-center justify-center ${className}`}
			style={{ perspective: "800px" }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			initial="idle"
			animate={isHovered ? "hover" : "idle"}
		>
			<motion.svg
				viewBox="0 0 200 160"
				className="w-full h-full"
				style={{ 
					maxWidth: "300px", 
					maxHeight: "240px",
					transformStyle: "preserve-3d",
				}}
				variants={containerVariants}
				transition={SPRING_CONFIG.hover}
			>
				{/* Subtle glow filter for hover */}
				<defs>
					<filter id="productGlow" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="1.5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Variant content */}
				<motion.g
					animate={{
						filter: isHovered ? "url(#productGlow)" : "none",
					}}
					transition={{ duration: 0.3 }}
					style={{
						animationPlayState: isHovered ? "running" : "running",
						// Speed up animations on hover via CSS
					}}
				>
					<VariantComponent />
				</motion.g>
			</motion.svg>
		</motion.div>
	);
};

export default ProductVisual;
