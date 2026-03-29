import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants-new';
import Crystal from './Crystal';
import ServiceCard from './cards/ServiceCard';
import SectionBadge from "./shared/SectionBadge";

const Services: React.FC<{ decorativeOnly?: boolean }> = ({
	decorativeOnly = false,
}) => {
	

	return (
		<section className="relative py-20 px-6 md:px-16 w-full h-screen mx-auto z-20 flex flex-col justify-center items-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-12"
			>
				<SectionBadge className="mb-6 mx-auto">
					<span className="material-icons-outlined text-sm">
						build
					</span>
					services
				</SectionBadge>
				<h2 className="text-3xl md:text-5xl font-display font-medium">
					What I Can Build{" "}
					<span className="text-purple-400">For You</span>
				</h2>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{SERVICES.map((service, index) => (
					<ServiceCard key={index} service={service} index={index} />
				))}
			</div>

			<Crystal
				imageName="img4"
				customCss={{
					bottom: "-10%",
					right: "0%",
					width: "350px",
					opacity: 1,
					// border: "1px solid white",
					zIndex: -1,
				}}
				rotate={0}
			/>
		</section>
	);
};

export default Services;