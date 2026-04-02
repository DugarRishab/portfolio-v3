import React from "react";
import { motion } from "framer-motion";

interface CalloutProps {
	variant?: "info" | "warning" | "success" | "note";
	title?: string;
	children: React.ReactNode;
}

const variantStyles = {
	info: {
		bg: "bg-blue-500/10",
		border: "border-blue-500/30",
		icon: "info",
		iconColor: "text-blue-400",
		titleColor: "text-blue-300",
	},
	warning: {
		bg: "bg-orange-500/10",
		border: "border-orange-500/30",
		icon: "warning",
		iconColor: "text-orange-400",
		titleColor: "text-orange-300",
	},
	success: {
		bg: "bg-green-500/10",
		border: "border-green-500/30",
		icon: "check_circle",
		iconColor: "text-green-400",
		titleColor: "text-green-300",
	},
	note: {
		bg: "bg-purple-500/10",
		border: "border-purple-500/30",
		icon: "lightbulb",
		iconColor: "text-purple-400",
		titleColor: "text-purple-300",
	},
};

const Callout: React.FC<CalloutProps> = ({
	variant = "info",
	title,
	children,
}) => {
	const styles = variantStyles[variant];

	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className={`${styles.bg} ${styles.border} border-l-4 rounded-r-lg p-4 my-6`}
		>
			<div className="flex gap-3">
				<span
					className={`material-icons-outlined ${styles.iconColor} flex-shrink-0 mt-0.5`}
				>
					{styles.icon}
				</span>
				<div>
					{title && (
						<h4
							className={`${styles.titleColor} font-medium mb-1`}
						>
							{title}
						</h4>
					)}
					<div className="text-gray-300 text-sm leading-relaxed">
						{children}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Callout;
