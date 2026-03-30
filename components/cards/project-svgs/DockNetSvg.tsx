import React from "react";
import { motion } from "framer-motion";

interface DockNetSvgProps {
	className?: string;
}

const DockNetSvg: React.FC<DockNetSvgProps> = ({ className = "" }) => {
	return (
		<motion.div
			className={`relative w-full h-full flex items-center justify-center ${className}`}
			initial="idle"
			whileHover="hover"
			style={{ perspective: "1000px" }}
		>
			<motion.svg
				viewBox="0 0 400 300"
				className="w-full h-full max-w-[400px] max-h-[300px]"
				variants={{
					idle: { rotateX: 0, rotateY: 0, scale: 1 },
					hover: { rotateX: 5, rotateY: -5, scale: 1.05 },
				}}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				style={{ transformStyle: "preserve-3d" }}
			>
				<defs>
					{/* Gradient for container glow */}
					<linearGradient id="containerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
						<stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
					</linearGradient>
					
					{/* Glow filter */}
					<filter id="docknetGlow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					{/* Animated dash pattern */}
					<pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
						<path
							d="M 20 0 L 0 0 0 20"
							fill="none"
							stroke="rgba(168, 85, 247, 0.1)"
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>

				{/* Background grid */}
				<rect width="400" height="300" fill="url(#gridPattern)" opacity="0.5" />

				{/* Main container box - Docker-like */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -3 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
				>
					{/* Container 1 - Top left */}
					<motion.rect
						x="60"
						y="80"
						width="80"
						height="50"
						rx="4"
						fill="url(#containerGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					/>
					<motion.text
						x="100"
						y="110"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						API
					</motion.text>

					{/* Container 2 - Top right */}
					<motion.rect
						x="160"
						y="80"
						width="80"
						height="50"
						rx="4"
						fill="url(#containerGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="110"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						DB
					</motion.text>

					{/* Container 3 - Far right */}
					<motion.rect
						x="260"
						y="80"
						width="80"
						height="50"
						rx="4"
						fill="url(#containerGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 0.4 }}
					/>
					<motion.text
						x="300"
						y="110"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						CACHE
					</motion.text>
				</motion.g>

				{/* Docker Engine / Orchestration Layer */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -2 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
				>
					<motion.rect
						x="60"
						y="150"
						width="280"
						height="40"
						rx="4"
						fill="none"
						stroke="rgba(168, 85, 247, 0.3)"
						strokeWidth="1"
						strokeDasharray="4 2"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					/>
					<motion.text
						x="200"
						y="175"
						textAnchor="middle"
						fill="rgba(156, 163, 175, 0.6)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						DOCKER ENGINE
					</motion.text>
				</motion.g>

				{/* Host / Infrastructure Layer */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
				>
					<motion.rect
						x="40"
						y="210"
						width="320"
						height="50"
						rx="6"
						fill="none"
						stroke="rgba(107, 114, 128, 0.3)"
						strokeWidth="1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
					/>
					<motion.text
						x="200"
						y="240"
						textAnchor="middle"
						fill="rgba(107, 114, 128, 0.5)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.9 }}
					>
						HOST INFRASTRUCTURE
					</motion.text>
				</motion.g>

				{/* Connection lines - vertical from containers to engine */}
				<motion.line
					x1="100"
					y1="130"
					x2="100"
					y2="150"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="130"
					x2="200"
					y2="150"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.45, duration: 0.3 }}
				/>
				<motion.line
					x1="300"
					y1="130"
					x2="300"
					y2="150"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
				/>

				{/* Connection from engine to host */}
				<motion.line
					x1="200"
					y1="190"
					x2="200"
					y2="210"
					stroke="rgba(107, 114, 128, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.7, duration: 0.3 }}
				/>

				{/* Animated data flow particles */}
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#docknetGlow)"
					animate={{
						cx: [100, 100],
						cy: [130, 150],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 1,
					}}
				/>
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#docknetGlow)"
					animate={{
						cx: [200, 200],
						cy: [130, 150],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 0.5,
					}}
				/>
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#docknetGlow)"
					animate={{
						cx: [300, 300],
						cy: [130, 150],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 1,
					}}
				/>

				{/* Network connection lines between containers */}
				<motion.path
					d="M 140 105 Q 150 90 160 105"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.6, duration: 0.4 }}
				/>
				<motion.path
					d="M 240 105 Q 250 90 260 105"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.7, duration: 0.4 }}
				/>

				{/* Decorative corner brackets */}
				<motion.path
					d="M 30 50 L 30 30 L 50 30"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
				/>
				<motion.path
					d="M 370 50 L 370 30 L 350 30"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 1.1, duration: 0.5 }}
				/>
				<motion.path
					d="M 30 250 L 30 270 L 50 270"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 1.2, duration: 0.5 }}
				/>
				<motion.path
					d="M 370 250 L 370 270 L 350 270"
					fill="none"
					stroke="rgba(168, 85, 247, 0.2)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 1.3, duration: 0.5 }}
				/>

				{/* Small status indicators on containers */}
				<motion.circle
					cx="130"
					cy="90"
					r="3"
					fill="#22c55e"
					animate={{
						opacity: [0.5, 1, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
					}}
				/>
				<motion.circle
					cx="230"
					cy="90"
					r="3"
					fill="#22c55e"
					animate={{
						opacity: [0.5, 1, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						delay: 0.3,
					}}
				/>
				<motion.circle
					cx="330"
					cy="90"
					r="3"
					fill="#22c55e"
					animate={{
						opacity: [0.5, 1, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						delay: 0.6,
					}}
				/>
			</motion.svg>
		</motion.div>
	);
};

export default DockNetSvg;
