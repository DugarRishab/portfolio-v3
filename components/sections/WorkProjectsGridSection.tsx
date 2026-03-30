import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PROJECTS } from '../../constants-new';
import ProjectCard from '../cards/ProjectCard';
import SectionBadge from "../shared/SectionBadge";

const CATEGORIES = [
	{ id: "all", label: "All Work" },
	{ id: "software", label: "Software Dev" },
	{ id: "electrical", label: "Electrical" },
	{ id: "ai", label: "AI / ML" },
];

const WorkProjectsGridSection: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const filteredProjects =
		activeCategory === "all"
			? ALL_PROJECTS
			: ALL_PROJECTS.filter((p) => p.category === activeCategory);

	return (
		<section className="px-6 md:px-16 py-20 relative z-10">
			<div className="max-w-[1400px] mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
					<div>
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								folder
							</span>
							projects
						</SectionBadge>
						<h2 className="text-3xl md:text-5xl font-display font-medium">
							Selected{" "}
							<span className="text-purple-400">Projects</span>
						</h2>
					</div>

					{/* Filter Tabs */}
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((cat) => (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
									activeCategory === cat.id
										? "bg-purple-500 text-white border-purple-500"
										: "bg-transparent text-gray-400 border-white/10 hover:border-purple-500/50"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>

				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</section>
	);
};

export default WorkProjectsGridSection;
