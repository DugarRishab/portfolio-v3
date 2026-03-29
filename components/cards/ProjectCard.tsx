import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ProjectItem } from "../../types";

interface ProjectCardProps {
	project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.3 }}
			className="group relative"
		>
			<motion.div
				whileHover={{ y: -10 }}
				className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 hover:border-purple-500/30 transition-colors duration-300"
			>
				{/* Image Area */}
				<div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
					/>
					<div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/10">
						{project.category}
					</div>
				</div>

				{/* Content Area */}
				<div className="p-6 flex flex-col flex-grow">
					<div className="mb-4">
						<h3 className="text-2xl font-display font-medium mb-1 group-hover:text-purple-300 transition-colors">
							{project.title}
						</h3>
						<span className="text-xs text-gray-500 uppercase tracking-widest">
							{project.role}
						</span>
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
						{project.description}
					</p>

					<Link
						to={`/case-studies/${project.id}`}
						className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white mt-auto group/link"
					>
						View Case Study
						<span className="material-icons-outlined text-sm group-hover/link:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</Link>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ProjectCard;
