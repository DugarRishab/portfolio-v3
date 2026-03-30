import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../../types";
import SectionBadge from "../shared/SectionBadge";
import ProjectCard from "../cards/ProjectCard";

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
			className="relative py-20 px-6 md:px-16 w-full mx-auto"
			id="projects"
		>
			<div className="max-w-[1400px] mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<SectionBadge className="mb-4">
						<span className="material-icons-outlined text-sm">
							folder
						</span>
						projects
					</SectionBadge>
					<h2 className="text-3xl md:text-5xl font-display font-medium">
						Systems I've{" "}
						<span className="text-purple-400">Built</span>
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
						>
							<ProjectCard
								project={{
									id: project.id,
									title: project.title,
									description: project.desc,
									image: project.img,
									category: project.tags[0] || "Project",
									role: undefined,
								}}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
