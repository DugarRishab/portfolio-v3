import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Crystal from "./Crystal";
import { FullDiagram } from "./sections/SystemPipelineSection";
import SectionBadge from "./shared/SectionBadge";

const APPROACH_STEPS = [
	{
		num: "01",
		title: "Understand",
		desc: "Deep dive into your business logic and pain points",
	},
	{
		num: "02",
		title: "Architect",
		desc: "Design scalable systems with clear data flows",
	},
	{
		num: "03",
		title: "Build",
		desc: "Implement with clean code and proper testing",
	},
	{
		num: "04",
		title: "Deploy",
		desc: "Ship to production with monitoring and docs",
	},
];

const About: React.FC<{ decorativeOnly?: boolean }> = ({
	decorativeOnly = false,
}) => {
	const sectionRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const diagramX = useTransform(scrollYProgress, [0, 1], [0, -600]);

	return (
		<section ref={sectionRef} className="relative w-full py-12 md:py-20 mt-20">
			<div className="flex flex-col px-6 md:px-16 mx-auto max-w-[1400px] z-2">
				<div className="mb-0">
					<SectionBadge className="mb-6">
						<span className="material-icons-outlined text-sm">
							architecture
						</span>
						approach
					</SectionBadge>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-medium leading-tight w-[60%] md:w-[100%]"
					>
						I design and build{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
							systems that work
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mb-12 max-w-4xl text-base sm:text-lg text-gray-400 leading-relaxed"
					>
						From architecture to deployment, I build complete
						systems that seamlessly integrate frontend, backend, and
						infrastructure. Every component is designed to work
						together, creating reliable, scalable solutions that
						deliver real value.
					</motion.p>

					{/* Approach Steps */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
						{APPROACH_STEPS.map((step, index) => (
							<motion.div
								key={step.num}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 * index }}
								className="group"
							>
								<span className="text-purple-500/40 font-mono text-xs sm:text-sm">
									{step.num}
								</span>
								<h4 className="text-white font-display font-semibold text-base sm:text-lg mt-1 group-hover:text-purple-300 transition-colors">
									{step.title}
								</h4>
								<p className="text-gray-500 text-xs sm:text-sm mt-1">
									{step.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>

				{/* Horizontal scroll-linked diagram container */}
				<div className="relative overflow-hidden pb-4 md:pb-0">
					<motion.div
						className="w-max"
						style={{
							x: diagramX,
							zIndex: 1,
							// overflow: "hidden",
						}}
					>
						<FullDiagram />
					</motion.div>
				</div>
			</div>

			{/* <div className="pointer-events-none absolute left-0 top-0 z-[-1] hidden h-full w-full lg:block border"> */}
			<Crystal
				imageName="img2"
				customCss={{
					// top: "10%",
					right: "0",
					// width: "400px",
					opacity: 1,
					zIndex: 0,
				}}
				scale={1}
				className="w-[60%] md:w-[400px] top-[-5%] md:top-[10%]"
			/>
			{/* </div> */}
		</section>
	);
};

export default About;
