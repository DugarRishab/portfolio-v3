import { motion } from "framer-motion";

interface PipelineConnectorProps {
	index: number;
	label: string;
}

const PipelineConnector = ({ index, label }: PipelineConnectorProps) => {
	return (
		<div className="flex-shrink-0 flex flex-col items-center justify-center w-[120px] md:w-[160px] relative">
			{/* Animated dashes */}
			<div className="relative w-full h-[2px] overflow-hidden">
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary to-primary/40"
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
					viewport={{ once: true }}
					style={{ originX: 0 }}
				/>
				{/* Animated pulse traveling along the line */}
				<motion.div
					className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-primary to-transparent"
					animate={{ x: ["-32px", "calc(100% + 32px)"] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
						delay: index * 0.5,
					}}
				/>
			</div>

			{/* Arrow + label */}
			<motion.div
				className="mt-2 flex items-center gap-1"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
				viewport={{ once: true }}
			>
				<span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
					{label}
				</span>
				<svg
					width="16"
					height="8"
					viewBox="0 0 16 8"
					className="text-primary"
				>
					<path
						d="M0 4h12M10 1l3 3-3 3"
						stroke="currentColor"
						strokeWidth="1.5"
						fill="none"
					/>
				</svg>
			</motion.div>
		</div>
	);
};

export default PipelineConnector;
