import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ProjectItem } from "../../types";
import DockNetSvg from "./project-svgs/DockNetSvg";
import KronMLSvg from "./project-svgs/KronMLSvg";
import TangleSvg from "./project-svgs/TangleSvg";
import PaymentSvg from "./project-svgs/PaymentSvg";
import EcommerceSvg from "./project-svgs/EcommerceSvg";
import ProductCardSVG from "./ProductCardSVG";
import ProductVisual from "../shared/ProductVisual";

interface ProjectCardProps {
	project: ProjectItem;
}

const getProductVisualVariant = (
	projectId: string,
): "data-flow" | "network" | "automation" | "containers" | null => {
	switch (projectId) {
		case "docknet":
			return "containers";
		case "kronml-ui-platform":
			return "network";
		case "tangle-sg":
			return "automation";
		case "payment-infrastructure":
			return "data-flow";
		case "ecommerce-platform":
			return "network";
		case "client-onboarding-system":
			return "automation";
		case "finance-ai-mvp":
			return "data-flow";
		case "admin-management-console":
			return "network";
		case "iot-hackathon-project":
			return "containers";
		case "track-it":
			return "automation";
		case "oikotaan":
			return "network";
		case "bitcoin-wallet-system":
			return "data-flow";
		default:
			return null;
	}
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const variant = getProductVisualVariant(project.id);

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
				whileHover={{ y: -8 }}
				className="relative h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm"
			>
				{/* Gradient border effect on hover */}
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

				{/* Visualization Area - SVG or Image */}
				<div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden border-b border-white/5">
					{variant ? (
						<div className="w-full h-full flex items-center justify-center p-4">
							<ProductVisual variant={variant} />
						</div>
					) : (
						<>
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105 transform"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
						</>
					)}
					<div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/10 text-gray-300">
						{project.category || "Project"}
					</div>
				</div>

				{/* Content Area */}
				<div className="p-6 flex flex-col flex-grow relative z-10">
					<div className="mb-4">
						<h3 className="text-xl font-display font-medium mb-2 group-hover:text-purple-300 transition-colors">
							{project.title}
						</h3>
						{project.role && (
							<span className="text-xs text-gray-500 uppercase tracking-widest">
								{project.role}
							</span>
						)}
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
						{project.description}
					</p>

					<Link
						to={`/case-studies/${project.id}`}
						className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
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
