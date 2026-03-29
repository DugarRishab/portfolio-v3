import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Crystal from "./Crystal";
import { FullDiagram } from "./sections/SystemPipelineSection";

/* =======================================================================
   PARALLAX EFFECT CODE - COMMENTED OUT FOR NOW
   See git history for full sticky/fixed positioning implementation
   ======================================================================= */

const About: React.FC<{ decorativeOnly?: boolean }> = ({
	decorativeOnly = false,
}) => {
	const sectionRef = useRef<HTMLDivElement>(null);

	// Track scroll progress as section moves through viewport
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"], // From when section enters to when it leaves
	});

	// Move diagram left as user scrolls down (partial travel, not full)
	const diagramX = useTransform(scrollYProgress, [0, 1], [0, -600]);

	return (
		<section
			ref={sectionRef}
			className="relative h-screen w-full"
		>
			<div className="flex h-full flex-col px-6 pt-12 md:px-16">
				<div className="mb-6 flex-shrink-0">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="mb-6 w-[80%] text-4xl font-display font-medium leading-tight md:text-5xl lg:text-6xl mouseHover"
					>
						I design and build{" "}
						<span className="text-purple-400">
							systems that work
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mb-0 max-w-4xl text-lg text-muted-foreground leading-relaxed"
					>
						From architecture to deployment, I build complete
						systems that seamlessly integrate frontend, backend, and
						infrastructure. Every component is designed to work
						together, creating reliable, scalable solutions that
						deliver real value.
					</motion.p>

					{/* Progress bar - commented out for now
					<div className="flex items-center gap-4">
						<div className="h-[2px] w-48 overflow-hidden rounded-full bg-border">
							<motion.div
								className="h-full rounded-full bg-primary"
								style={{ width: depthProgress }}
							/>
						</div>
						<motion.span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
							{depthLabel}
						</motion.span>
					</div>
					*/}
				</div>

				{/* Horizontal scroll-linked diagram container */}
				<div className="relative flex-1">
					<motion.div
						className="w-max"
						style={{
							x: diagramX,
							height: "100%",
							objectFit: "contain",
							objectPosition: "center",
							zIndex: 1,
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
						top: "10%",
						right: "0",
						width: "400px",
						opacity: 1,
						zIndex: 0,
					}}
					scale={1}
				/>
			{/* </div> */}
		</section>
	);
};

export default About;
