import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Crystal from "./Crystal";
import SectionBadge from "./shared/SectionBadge";
import FeaturedProjectCard from "./cards/FeaturedProjectCard";
import BrandLogos from "./shared/BrandLogos";
import { loadWorkExperience } from "@/utils/workexData";
import { WorkExperience } from "@/types";
import WorkExperienceCard from "./cards/WorkExperienceCard";

interface FeaturedWorkProps {
	onShowReport?: (id: string) => void;
	decorativeOnly?: boolean;
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({
	onShowReport,
	decorativeOnly = false,
}) => {
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			const data = await loadWorkExperience();
			setWorkExperience(data);
			setLoading(false);
		};
		loadData();
	}, []);

	// Infinite Carousel Logic
	// We duplicate the array to create a seamless loop effect visually
	const carouselItems = [...workExperience];

	useEffect(() => {
		if (workExperience.length === 0) return;
		const timer = setInterval(() => {
			setCarouselIndex((prev) => (prev + 1) % workExperience.length);
		}, 10000); // Moves every 10 seconds
		return () => clearInterval(timer);
	}, [workExperience.length]);

	return (
		<section
			className="relative py-20 px-6 md:px-16 mx-auto h-full auto-height"
			id="work"
		>
			<Crystal
				imageName="img5"
				customCss={{
					top: "-10%",
					left: "0%",
					width: "600px",
					opacity: 1,
					zIndex: 0,
				}}
				rotate={0}
				scale={1}
			/>

			{/* Header for Work */}
			<div className="flex flex-col md:flex-row justify-end items-end mb-16 relative z-10">
				<div className="text-right">
					<SectionBadge
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="mb-4 justify-end ml-auto"
					>
						systems
					</SectionBadge>
					<motion.h2
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="text-5xl md:text-6xl font-display font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white"
					>
						Work Experience
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="text-gray-300 max-w-3xl ml-auto mb-6 text-lg"
					>
						Architecting scalable distributed systems, implementing
						microservices architectures, and optimizing
						performance-critical applications across cloud-native
						environments.
					</motion.p>
					{/* <motion.a
						href="#"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors"
					>
						View full work experience
						<span className="material-icons-outlined text-sm">
							arrow_forward
						</span>
					</motion.a> */}
				</div>
			</div>

			<FeaturedProjectCard onShowReport={onShowReport} />

			<BrandLogos />

			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px" }}
				transition={{ duration: 0.8 }}
				className="w-full"
			>
				{/* Carousel Container */}
				<div className="flex gap-6 md:gap-8 w-full overflow-x-hidden">
					<motion.div
						className="flex flex-row flex-wrap justify-center items-center gap-6 md:gap-8 w-full"
						// animate={{
						//   x: `-${carouselIndex * 400}px` // Assumes card width + gap is approx 340px
						// }}
						transition={{
							type: "spring",
							stiffness: 50,
							damping: 20,
						}}
					>
						{carouselItems.map((item, index) => (
							<WorkExperienceCard
								key={`${item.id}-${index}`}
								company={item.company}
								role={item.title}
								description={item.overview}
								duration={`${item.startDate} - ${item.endDate}`}
								cardBg={item.cardBg}
								id={item.id}
							/>
						))}
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};

export default FeaturedWork;
