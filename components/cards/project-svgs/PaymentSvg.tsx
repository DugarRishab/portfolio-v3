import React from "react";
import { motion } from "framer-motion";

interface PaymentSvgProps {
	className?: string;
}

const PaymentSvg: React.FC<PaymentSvgProps> = ({ className = "" }) => {
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
					<linearGradient id="paymentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
						<stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
					</linearGradient>
					<filter id="paymentGlow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<rect width="400" height="300" fill="transparent" />

				{/* Client/Checkout */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -4 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
				>
					<motion.rect
						x="50"
						y="40"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					/>
					<motion.text
						x="85"
						y="70"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						Client
					</motion.text>
				</motion.g>

				{/* Payment API */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -3 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
				>
					<motion.rect
						x="165"
						y="40"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="70"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						API
					</motion.text>
				</motion.g>

				{/* Payment Gateway */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -2 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
				>
					<motion.rect
						x="280"
						y="40"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 0.4 }}
					/>
					<motion.text
						x="315"
						y="70"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						Gateway
					</motion.text>
				</motion.g>

				{/* Validation */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: -1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
				>
					<motion.rect
						x="120"
						y="130"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.4 }}
					/>
					<motion.text
						x="155"
						y="160"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
					>
						Validate
					</motion.text>
				</motion.g>

				{/* Ledger DB */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 0 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
				>
					<motion.rect
						x="235"
						y="130"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 0.4 }}
					/>
					<motion.text
						x="270"
						y="160"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						Ledger
					</motion.text>
				</motion.g>

				{/* Webhook Handler */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.25 }}
				>
					<motion.rect
						x="50"
						y="220"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.4 }}
					/>
					<motion.text
						x="85"
						y="245"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						Webhook
					</motion.text>
				</motion.g>

				{/* Notifications */}
				<motion.g
					variants={{
						idle: { y: 0 },
						hover: { y: 1 },
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
				>
					<motion.rect
						x="165"
						y="220"
						width="70"
						height="50"
						rx="4"
						fill="url(#paymentGradient)"
						stroke="rgba(168, 85, 247, 0.5)"
						strokeWidth="1"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.7, duration: 0.4 }}
					/>
					<motion.text
						x="200"
						y="245"
						textAnchor="middle"
						fill="rgba(168, 85, 247, 0.8)"
						fontSize="9"
						fontFamily="monospace"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.9 }}
					>
						Notify
					</motion.text>
				</motion.g>

				{/* Connection lines */}
				<motion.line
					x1="120"
					y1="65"
					x2="165"
					y2="65"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				/>
				<motion.line
					x1="235"
					y1="65"
					x2="280"
					y2="65"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
				/>
				<motion.line
					x1="200"
					y1="90"
					x2="155"
					y2="130"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.55, duration: 0.3 }}
				/>
				<motion.line
					x1="315"
					y1="90"
					x2="270"
					y2="130"
					stroke="rgba(168, 85, 247, 0.3)"
					strokeWidth="1"
					strokeDasharray="2 2"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ delay: 0.6, duration: 0.3 }}
				/>
				<motion.line
					x1="270"
					y1="180"
					x2="200"
					y2="220"
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
					filter="url(#paymentGlow)"
					animate={{
						cx: [120, 165],
						cy: [65, 65],
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
					filter="url(#paymentGlow)"
					animate={{
						cx: [200, 155],
						cy: [90, 130],
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
					cx="95"
					cy="30"
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
					cx="325"
					cy="30"
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

export default PaymentSvg;
