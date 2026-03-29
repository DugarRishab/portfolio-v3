import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Project } from "../../types";
import SectionBadge from "../shared/SectionBadge";

const ProjectsSection: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProjects = async () => {
			try {
				const response = await fetch("/assets/data/projects.json");
				if (response.ok) {
					const data = await response.json();
					setProjects(data);
				}
			} catch (error) {
				console.error("Error loading projects:", error);
			} finally {
				setLoading(false);
			}
		};
		loadProjects();
	}, []);

	if (loading) {
		return (
			<section className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="glass-card rounded-2xl h-96 animate-pulse"
						/>
					))}
				</div>
			</section>
		);
	}

	return (
		<section
			className="auto-height relative py-20 px-6 md:px-16 w-full max-w-[2560px] mx-auto"
			id="projects"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="mb-12"
			>
				<SectionBadge className="mb-6">
					<span className="material-icons-outlined text-sm">
						folder
					</span>
					projects
				</SectionBadge>
				<h2 className="text-3xl md:text-5xl font-display font-medium">
					Systems I've <span className="text-purple-400">Built</span>
				</h2>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project, index) => (
					<motion.div
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="group"
					>
						<Link to={`/case-studies/${project.id}`}>
							<motion.div
								whileHover={{ y: -10 }}
								className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 hover:border-purple-500/30 transition-colors duration-300"
							>
								<div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
									<img
										src={project.img}
										alt={project.title}
										className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
									/>
								</div>

								<div className="p-6 flex flex-col flex-grow">
									<h3 className="text-xl font-display font-medium mb-2 group-hover:text-purple-300 transition-colors">
										{project.title}
									</h3>
									<p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
										{project.desc}
									</p>

									<div className="flex flex-wrap gap-2 mb-4">
										{project.tags.map((tag, i) => (
											<span
												key={i}
												className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
											>
												{tag}
											</span>
										))}
									</div>

									<div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-purple-400 mt-auto">
										View Case Study
										<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
											arrow_forward
										</span>
									</div>
								</div>
							</motion.div>
						</Link>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default ProjectsSection;
