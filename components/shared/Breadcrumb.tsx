import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			className={`text-sm text-gray-400 font-mono flex items-center gap-2 ${className}`}
		>
			{items.map((item, index) => (
				<React.Fragment key={index}>
					{item.href ? (
						<Link
							to={item.href}
							className="text-gray-400 hover:text-white transition-colors cursor-pointer"
						>
							{item.label}
						</Link>
					) : (
						<span className="text-white">{item.label}</span>
					)}
					{index < items.length - 1 && (
						<span className="text-gray-600">/</span>
					)}
				</React.Fragment>
			))}
		</motion.div>
	);
};

export default Breadcrumb;
