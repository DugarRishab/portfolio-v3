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
	const carouselItems = [...workExperience].slice(0, 3);

	useEffect(() => {
		if (workExperience.length === 0) return;
		const timer = setInterval(() => {
			setCarouselIndex((prev) => (prev + 1) % workExperience.length);
		}, 10000); // Moves every 10 seconds
		return () => clearInterval(timer);
	}, [workExperience.length]);

	return (
		<section className="relative py-20 px-6 md:px-16 mx-auto" id="work">
			<Crystal
				imageName="img5"
				className="sm:top-[-7.5%] md:top-[-10%]"
				customCss={{
					top: "-5%",
					left: "0%",
					width: "600px",
					opacity: 1,
					zIndex: 0,
				}}
				rotate={0}
				scale={1}
			/>

			{/* Header for Work */}
			<div className="max-w-[1400px] mx-auto mb-12 relative z-10 mt-20 md:mt-0">
				<div className="flex flex-col md:items-end md:justify-end gap-6">
					<div className="text-right">
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								work
							</span>
							experience
						</SectionBadge>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-5xl font-display font-medium mb-4"
						>
							Where I've{" "}
							<span className="text-purple-400">Made Impact</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-gray-400 max-w-2xl"
						>
							Building scalable systems, leading engineering
							teams, and delivering production-ready solutions
							across startups and enterprises.
						</motion.p>
					</div>
					<motion.a
						href="/work-experience"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors group text-right"
					>
						View all work experience
						<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</motion.a>
				</div>
			</div>

			<FeaturedProjectCard onShowReport={onShowReport} />

			<BrandLogos />

			{/* Work Experience Cards */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="max-w-[1400px] mx-auto"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
				</div>
			</motion.div>
		</section>
	);
};

export default FeaturedWork;
