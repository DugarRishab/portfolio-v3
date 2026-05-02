import React from 'react';
import { motion } from 'framer-motion';
import Crystal from '../Crystal';
import SectionBadge from "../shared/SectionBadge";
import Breadcrumb from "../shared/Breadcrumb";

const TECH_STACK = [
	{ name: "Node.js", icon: "code" },
	{ name: "React", icon: "web" },
	{ name: "Python", icon: "psychology" },
	{ name: "AWS", icon: "cloud" },
	{ name: "PostgreSQL", icon: "storage" },
];

const WorkHeaderSection: React.FC = () => {
	return (
		<section className="relative px-6 md:px-16 mb-16 min-h-[50vh] flex flex-col justify-center">
			{/* Decorative Crystal */}
			<Crystal
				imageName="img1"
				customCss={{
					top: "-10%",
					right: "-5%",
					width: "500px",
					opacity: 0.8,
					zIndex: 0,
				}}
				rotate={-15}
			/>

			<div className="relative z-10 max-w-[1400px] mx-auto w-full">
				{/* Breadcrumb */}
				<Breadcrumb
					items={[
						{ label: 'rishab dugar', href: '/' },
						{ label: 'work' },
					]}
					className="mb-8"
				/>

				<SectionBadge className="mb-6">
					<span className="material-icons-outlined text-sm">
						work
					</span>
					portfolio
				</SectionBadge>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-5xl md:text-7xl font-display font-medium leading-tight mb-6 tracking-tight"
				>
					Work & <span className="text-purple-400">Projects</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed"
				>
					A collection of systems, automations, and applications I've
					built for startups, enterprises, and personal projects.
				</motion.p>

				{/* Tech Stack Pills */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="flex flex-wrap gap-3"
				>
					{TECH_STACK.map((tech) => (
						<div
							key={tech.name}
							className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-purple-500/30 transition-colors"
						>
							<span className="material-icons-outlined text-sm text-purple-400">
								{tech.icon}
							</span>
							<span className="text-sm text-white">
								{tech.name}
							</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default WorkHeaderSection;
