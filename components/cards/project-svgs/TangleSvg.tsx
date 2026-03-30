import React from "react";
import { motion } from "framer-motion";

interface TangleSvgProps {
	className?: string;
}

const TangleSvg: React.FC<TangleSvgProps> = ({ className = "" }) => {
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
					<linearGradient id="tangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
						<stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
					</linearGradient>
					<filter id="tangleGlow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<rect width="400" height="300" fill="transparent" />

				{/* DAG Node 1 - Top Left */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="80"
						cy="60"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="80"
						y="65"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX1
					</text>
				</motion.g>

				{/* DAG Node 2 - Top Center */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.15, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="200"
						cy="50"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="200"
						y="55"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX2
					</text>
				</motion.g>

				{/* DAG Node 3 - Top Right */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="320"
						cy="60"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="320"
						y="65"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX3
					</text>
				</motion.g>

				{/* DAG Node 4 - Middle Left */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.25, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="140"
						cy="150"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="140"
						y="155"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX4
					</text>
				</motion.g>

				{/* DAG Node 5 - Middle Right */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.3, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="260"
						cy="150"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="260"
						y="155"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX5
					</text>
				</motion.g>

				{/* DAG Node 6 - Bottom */}
				<motion.g
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.35, duration: 0.4 }}
					whileHover={{ scale: 1.1 }}
				>
					<circle
						cx="200"
						cy="240"
						r="20"
						fill="url(#tangleGradient)"
						stroke="rgba(168, 85, 247, 0.6)"
						strokeWidth="1.5"
					/>
					<text
						x="200"
						y="245"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
					>
						TX6
					</text>
				</motion.g>

				{/* Connection lines - DAG edges */}
				<motion.line
					x1="95"
					y1="75"
					x2="185"
					y2="65"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				/>
				<motion.line
					x1="215"
					y1="70"
					x2="305"
					y2="75"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.45, duration: 0.3 }}
				/>
				<motion.line
					x1="80"
					y1="80"
					x2="140"
					y2="130"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="70"
					x2="200"
					y2="130"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.55, duration: 0.3 }}
				/>
				<motion.line
					x1="320"
					y1="80"
					x2="260"
					y2="130"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.6, duration: 0.3 }}
				/>
				<motion.line
					x1="140"
					y1="170"
					x2="200"
					y2="220"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.65, duration: 0.3 }}
				/>
				<motion.line
					x1="260"
					y1="170"
					x2="200"
					y2="220"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.7, duration: 0.3 }}
				/>

				{/* Animated data flow particles */}
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#tangleGlow)"
					animate={{
						cx: [80, 140],
						cy: [80, 130],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatDelay: 1,
					}}
				/>
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#tangleGlow)"
					animate={{
						cx: [200, 200],
						cy: [70, 130],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 0.5,
					}}
				/>
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#tangleGlow)"
					animate={{
						cx: [140, 200],
						cy: [170, 220],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 1,
					}}
				/>

				{/* Status indicators */}
				<motion.circle
					cx="90"
					cy="50"
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
					cx="210"
					cy="40"
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
					cy="50"
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

export default TangleSvg;
