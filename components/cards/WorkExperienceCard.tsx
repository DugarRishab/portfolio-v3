import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface WorkExperienceCardProps {
	company: string;
	role: string;
	description: string;
	duration: string;
	cardBg: string;
	id?: string;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
	company,
	role,
	description,
	duration,
	cardBg,
	id,
}) => {
	return (
		<motion.div
			whileHover={{ y: -8, transition: { duration: 0.3 } }}
			className="w-full h-[340px] glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative group hover:border-purple-500/30 transition-all duration-300 overflow-hidden cursor-pointer"
		>
			{/* Subtle gradient overlay on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
						{company}
					</h4>
					<span className="text-xs font-mono text-gray-500">
						{duration}
					</span>
				</div>
				<h3 className="text-2xl font-display font-semibold leading-tight mb-4 text-white group-hover:text-purple-200 transition-colors">
					{role}
				</h3>
				<p className="text-gray-400 leading-relaxed text-sm line-clamp-4 group-hover:text-gray-300 transition-colors">
					{description}
				</p>
			</div>

			<div className="relative z-10 mt-auto pt-6 border-t border-white/5">
				{id ? (
					<Link
						to={`/workex/${id}`}
						className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition-colors group/link"
					>
						See full Experience
						<span className="material-icons-outlined text-sm group-hover/link:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</Link>
				) : (
					<span className="text-sm text-gray-600">
						Details coming soon
					</span>
				)}
			</div>
		</motion.div>
	);
};

export default WorkExperienceCard;
