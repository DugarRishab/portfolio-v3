import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ServiceItem } from "../../types";

interface ServiceCardProps {
	service: ServiceItem;
	index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
	return (
		<Link to={service.slug ? `/services/${service.slug}` : "#"}>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: index * 0.1 }}
				whileHover={{ y: -8, transition: { duration: 0.3 } }}
				className="glass-card p-8 rounded-2xl group hover:bg-purple-500/5 hover:border-purple-500/20 border border-transparent transition-all duration-300 cursor-pointer h-full"
			>
				{/* Icon */}
				<div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
					<span className="material-icons-outlined text-2xl text-purple-400 group-hover:text-purple-300 transition-colors">
						{service.icon || "code"}
					</span>
				</div>

				<h3 className="text-xl font-display font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors">
					{service.title}
				</h3>
				<p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
					{service.description}
				</p>

				{/* Subtle arrow indicator */}
				<div className="mt-6 flex items-center gap-2 text-sm text-purple-400/60 group-hover:text-purple-400 transition-colors">
					<span className="font-medium">Learn more</span>
					<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
						arrow_forward
					</span>
				</div>
			</motion.div>
		</Link>
	);
};

export default ServiceCard;
