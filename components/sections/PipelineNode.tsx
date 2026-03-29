import { motion } from "framer-motion";

const cn = (...classes: (string | undefined | false)[]) =>
	classes.filter(Boolean).join(" ");

interface PipelineNodeProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
	accentColor: "primary" | "accent";
}

const PipelineNode = ({
	title,
	description,
	icon,
	index,
	accentColor,
}: PipelineNodeProps) => {
	return (
		<motion.div
			className="relative flex-shrink-0 w-[340px] md:w-[400px]"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			viewport={{ once: true, amount: 0.3 }}
		>
			<div
				className={cn(
					"relative rounded-xl border border-border bg-card p-6 md:p-8",
					"backdrop-blur-sm",
					"group hover:border-opacity-60 transition-all duration-500",
				)}
			>
				{/* Glow effect */}
				<div
					className={cn(
						"absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl",
						accentColor === "primary"
							? "bg-glow-primary/20"
							: "bg-glow-accent/20",
					)}
				/>

				{/* Icon */}
				<div
					className={cn(
						"w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-lg",
						accentColor === "primary"
							? "bg-primary/10 text-primary"
							: "bg-accent/10 text-accent",
					)}
				>
					{icon}
				</div>

				{/* Node number */}
				<span className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2 block">
					Stage {String(index + 1).padStart(2, "0")}
				</span>

				<h3 className="text-xl font-bold text-foreground mb-2">
					{title}
				</h3>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{description}
				</p>

				{/* Left accent bar */}
				<div
					className={cn(
						"absolute left-0 top-8 bottom-8 w-[2px] rounded-full",
						accentColor === "primary" ? "bg-primary" : "bg-accent",
					)}
				/>
			</div>
		</motion.div>
	);
};

export default PipelineNode;
