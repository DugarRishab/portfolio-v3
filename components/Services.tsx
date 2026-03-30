import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants-new';
import Crystal from './Crystal';
import ServiceCard from './cards/ServiceCard';
import SectionBadge from "./shared/SectionBadge";

const TECH_STACK = [
	{ name: "Node.js", category: "Backend" },
	{ name: "Python", category: "AI/ML" },
	{ name: "React", category: "Frontend" },
	{ name: "PostgreSQL", category: "Database" },
	{ name: "Redis", category: "Cache" },
	{ name: "AWS", category: "Cloud" },
	{ name: "Docker", category: "DevOps" },
	{ name: "n8n", category: "Automation" },
];

const Services: React.FC<{ decorativeOnly?: boolean }> = ({
	decorativeOnly = false,
}) => {
	return (
		<section className="relative py-20 px-6 md:px-16 w-full mx-auto z-20">
			<div className="max-w-[1400px] mx-auto w-full">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<SectionBadge className="mb-6">
						<span className="material-icons-outlined text-sm">
							build
						</span>
						services
					</SectionBadge>
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
						<div>
							<h2 className="text-3xl md:text-5xl font-display font-medium mb-4">
								What I Can Build{" "}
								<span className="text-purple-400">For You</span>
							</h2>
							<p className="text-gray-400 max-w-xl">
								End-to-end solutions from concept to production.
								I handle the technical complexity so you can
								focus on growing your business.
							</p>
						</div>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{SERVICES.map((service, index) => (
						<ServiceCard
							key={index}
							service={service}
							index={index}
						/>
					))}
				</div>

				{/* Tech Stack */}
				{/* <motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="pt-12 border-t border-white/5"
				>
					<p className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-6">
						Tech Stack
					</p>
					<div className="flex flex-wrap gap-3">
						{TECH_STACK.map((tech, index) => (
							<motion.div
								key={tech.name}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
								className="group px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 cursor-default"
							>
								<span className="text-white text-sm font-medium">
									{tech.name}
								</span>
								<span className="text-gray-500 text-xs ml-2 group-hover:text-purple-400 transition-colors">
									{tech.category}
								</span>
							</motion.div>
						))}
					</div>
				</motion.div> */}
			</div>

			<Crystal
				imageName="img4"
				customCss={{
					bottom: "-10%",
					right: "0%",
					width: "350px",
					opacity: 1,
					zIndex: -1,
				}}
				rotate={0}
			/>
		</section>
	);
};

export default Services;