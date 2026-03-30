import React from "react";
import { motion } from "framer-motion";

interface KronMLSvgProps {
	className?: string;
}

const KronMLSvg: React.FC<KronMLSvgProps> = ({ className = "" }) => {
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
					<linearGradient id="kronmlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
						<stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
					</linearGradient>
					<filter id="kronmlGlow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Background */}
				<rect width="400" height="300" fill="transparent" />

				{/* Client Layer */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -4 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
				>
					<motion.circle
						cx="80"
						cy="60"
						r="25"
						fill="url(#kronmlGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1.5"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					/>
					<motion.text
						x="80"
						y="65"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="10"
						fontFamily="monospace"
						fontWeight="bold"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						UI
					</motion.text>
				</motion.g>

				{/* NGINX Reverse Proxy */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -3 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
				>
					<motion.rect
						x="160"
						y="40"
						width="80"
						height="40"
						rx="4"
						fill="none"
						stroke="rgba(168, 85, 247, 0.4)"
						strokeWidth="1.5"
						strokeDasharray="3 2"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="65"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.7)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						NGINX
					</motion.text>
				</motion.g>

				{/* API Layer */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -2 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
				>
					<motion.rect
						x="310"
						y="40"
						width="70"
						height="40"
						rx="4"
						fill="url(#kronmlGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 0.4 }}
					/>
					<motion.text
						x="345"
						y="65"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						API
					</motion.text>
				</motion.g>

				{/* Cache Layer */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
				>
					<motion.rect
						x="160"
						y="120"
						width="80"
						height="40"
						rx="4"
						fill="url(#kronmlGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="145"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
					>
						Cache
					</motion.text>
				</motion.g>

				{/* Database */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 0 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
				>
					<motion.rect
						x="310"
						y="120"
						width="70"
						height="40"
						rx="4"
						fill="url(#kronmlGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 0.4 }}
					/>
					<motion.text
						x="345"
						y="145"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						DB
					</motion.text>
				</motion.g>

				{/* Kubernetes Orchestration */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.25 }}
				>
					<motion.rect
						x="50"
						y="200"
						width="300"
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
						y="230"
						textAnchor="middle"
						fill="rgba(107, 114, 128, 0.5)"
						fontSize="10"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.9 }}
					>
						KUBERNETES ORCHESTRATION
					</motion.text>
				</motion.g>

				{/* Connection lines */}
				<motion.line
					x1="105"
					y1="75"
					x2="160"
					y2="60"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				/>
				<motion.line
					x1="240"
					y1="60"
					x2="310"
					y2="60"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
				/>
				<motion.line
					x1="345"
					y1="80"
					x2="345"
					y2="120"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.6, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="80"
					x2="200"
					y2="120"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.65, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="160"
					x2="200"
					y2="200"
					stroke="rgba(107, 114, 128, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.7, duration: 0.3 }}
				/>

				{/* Data flow particles */}
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#kronmlGlow)"
					animate={{
						cx: [105, 160],
						cy: [75, 60],
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
					filter="url(#kronmlGlow)"
					animate={{
						cx: [240, 310],
						cy: [60, 60],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 0.5,
					}}
				/>

				{/* Status indicators */}
				<motion.circle
					cx="345"
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
					cx="200"
					cy="110"
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
			</motion.svg>
		</motion.div>
	);
};

export default KronMLSvg;
