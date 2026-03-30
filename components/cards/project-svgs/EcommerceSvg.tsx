import React from "react";
import { motion } from "framer-motion";

interface EcommerceSvgProps {
	className?: string;
}

const EcommerceSvg: React.FC<EcommerceSvgProps> = ({ className = "" }) => {
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
					<linearGradient id="ecommerceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
						<stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
					</linearGradient>
					<filter id="ecommerceGlow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<rect width="400" height="300" fill="transparent" />

				{/* Product Catalog */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -4 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
				>
					<motion.rect
						x="40"
						y="50"
						width="60"
						height="60"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					/>
					<motion.text
						x="70"
						y="85"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						Products
					</motion.text>
				</motion.g>

				{/* Shopping Cart */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -3 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
				>
					<motion.rect
						x="170"
						y="50"
						width="60"
						height="60"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="85"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						Cart
					</motion.text>
				</motion.g>

				{/* Checkout */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -2 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
				>
					<motion.rect
						x="300"
						y="50"
						width="60"
						height="60"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 0.4 }}
					/>
					<motion.text
						x="330"
						y="85"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						Order
					</motion.text>
				</motion.g>

				{/* User Auth */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
				>
					<motion.rect
						x="105"
						y="150"
						width="60"
						height="50"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.4 }}
					/>
					<motion.text
						x="135"
						y="178"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
					>
						Auth
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
						x="235"
						y="150"
						width="60"
						height="50"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 0.4 }}
					/>
					<motion.text
						x="265"
						y="178"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						Data
					</motion.text>
				</motion.g>

				{/* Order Processing */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.25 }}
				>
					<motion.rect
						x="170"
						y="230"
						width="60"
						height="50"
						rx="4"
						fill="url(#ecommerceGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="258"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						Process
					</motion.text>
				</motion.g>

				{/* Connection lines - flow */}
				<motion.line
					x1="100"
					y1="80"
					x2="170"
					y2="80"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				/>
				<motion.line
					x1="230"
					y1="80"
					x2="300"
					y2="80"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
				/>
				<motion.line
					x1="70"
					y1="110"
					x2="135"
					y2="150"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.55, duration: 0.3 }}
				/>
				<motion.line
					x1="330"
					y1="110"
					x2="265"
					y2="150"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.6, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="110"
					x2="200"
					y2="230"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.65, duration: 0.3 }}
				/>

				{/* Data flow particles */}
				<motion.circle
					r="2"
					fill="#a855f7"
					filter="url(#ecommerceGlow)"
					animate={{
						cx: [100, 170],
						cy: [80, 80],
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
					filter="url(#ecommerceGlow)"
					animate={{
						cx: [230, 300],
						cy: [80, 80],
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
					filter="url(#ecommerceGlow)"
					animate={{
						cx: [200, 200],
						cy: [110, 230],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 1,
						delay: 1,
					}}
				/>

				{/* Status indicators */}
				<motion.circle
					cx="80"
					cy="40"
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
					cx="320"
					cy="40"
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

export default EcommerceSvg;
