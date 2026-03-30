import React from "react";
import { motion } from "framer-motion";

interface TechItem {
	name: string;
	icon: string;
	category: "backend" | "frontend" | "database" | "devops" | "ai";
	color: string;
}

const TECH_STACK: TechItem[] = [
	{ name: "Node.js", icon: "dns", category: "backend", color: "#68A063" },
	{ name: "Python", icon: "code", category: "backend", color: "#3776AB" },
	{ name: "React", icon: "web", category: "frontend", color: "#61DAFB" },
	{ name: "TypeScript", icon: "javascript", category: "frontend", color: "#3178C6" },
	{ name: "PostgreSQL", icon: "storage", category: "database", color: "#336791" },
	{ name: "Redis", icon: "memory", category: "database", color: "#DC382D" },
	{ name: "Docker", icon: "inventory_2", category: "devops", color: "#2496ED" },
	{ name: "AWS", icon: "cloud", category: "devops", color: "#FF9900" },
	{ name: "n8n", icon: "account_tree", category: "ai", color: "#EA4B71" },
	{ name: "OpenAI", icon: "psychology", category: "ai", color: "#00A67E" },
];

const CATEGORIES = [
	{ id: "backend", label: "Backend", icon: "terminal" },
	{ id: "frontend", label: "Frontend", icon: "web" },
	{ id: "database", label: "Database", icon: "storage" },
	{ id: "devops", label: "DevOps", icon: "cloud_sync" },
	{ id: "ai", label: "AI/Automation", icon: "smart_toy" },
];

const TechStackSection: React.FC = () => {
	return (
		<section className="relative py-20 px-6 md:px-16 w-full mx-auto overflow-hidden">
			{/* Animated background grid */}
			<div className="absolute inset-0 opacity-30">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
			</div>

			<div className="max-w-[1400px] mx-auto relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
						<span className="material-icons-outlined text-purple-400 text-sm">
							build
						</span>
						<span className="text-sm text-gray-400 uppercase tracking-wider font-mono">
							tech stack
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-display font-medium mb-4">
						Tools I <span className="text-purple-400">Work With</span>
					</h2>
					<p className="text-gray-400 max-w-2xl">
						Production-tested technologies for building scalable systems,
						automations, and AI-powered applications.
					</p>
				</motion.div>

				{/* Tech Grid with Categories */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{CATEGORIES.map((category, catIndex) => (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: catIndex * 0.1 }}
							className="glass-card rounded-2xl p-5 border border-white/5 hover:border-purple-500/30 transition-all duration-300 group"
						>
							{/* Category Header */}
							<div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
								<span className="material-icons-outlined text-purple-400 text-lg">
									{category.icon}
								</span>
								<span className="text-sm font-medium text-white uppercase tracking-wider">
									{category.label}
								</span>
							</div>

							{/* Tech Items */}
							<div className="space-y-3">
								{TECH_STACK.filter((tech) => tech.category === category.id).map(
									(tech, techIndex) => (
										<motion.div
											key={tech.name}
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
											whileHover={{ x: 5, scale: 1.02 }}
											className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all cursor-default"
										>
											<div
												className="w-8 h-8 rounded-lg flex items-center justify-center"
												style={{ backgroundColor: `${tech.color}20` }}
											>
												<span
													className="material-icons-outlined text-sm"
													style={{ color: tech.color }}
												>
													{tech.icon}
												</span>
											</div>
											<span className="text-sm text-gray-300 group-hover:text-white transition-colors">
												{tech.name}
											</span>
										</motion.div>
									)
								)}
							</div>
						</motion.div>
					))}
				</div>

				{/* Animated connecting lines */}
				{/* <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px">
					<motion.div
						className="h-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1.5, delay: 0.5 }}
					/>
				</div> */}
			</div>
		</section>
	);
};

export default TechStackSection;
