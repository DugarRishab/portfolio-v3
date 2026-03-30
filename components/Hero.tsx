import React from "react";
import { motion } from "framer-motion";
import Crystal from "./Crystal";
import { CRYSTAL_IMAGES } from "../constants-new";

interface HeroProps {
	decorativeOnly?: boolean;
}

const TECH_STATS = [
	{ value: "3+", label: "Years Experience" },
	{ value: "50+", label: "Projects Delivered" },
	{ value: "100+", label: "Automations Built" },
	{ value: "40%", label: "Avg. Cost Reduction" },
];

const Hero: React.FC<HeroProps> = ({ decorativeOnly = false }) => {
	return (
		<section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20">
			{/* Subtle grid background */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

			<div className="relative px-6 md:px-16 z-10 w-full max-w-[1400px]">
				{/* Status indicator */}

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-3xl md:text-4xl lg:text-6xl font-display font-medium leading-[1.1] tracking-tight my-5"
				>
					I build{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
						AI-powered systems
					</span>
					<br className="hidden md:block" /> that reduce manual work
					<br className="hidden md:block" /> and{" "}
					<span className="text-purple-400">scale operations</span>.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-lg md:text-xl text-gray-400 mb-8 font-light max-w-2xl leading-relaxed"
				>
					I turn complex business processes into reliable,
					self-running pipelines.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-wrap gap-4 mb-10"
				>
					<a
						href="/case-studies"
						className="group px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2"
					>
						View Case Studies
						<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</a>
					<a
						href="#contact"
						className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
					>
						Schedule a Call
					</a>
				</motion.div>

				{/* Tech Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10"
				>
					{TECH_STATS.map((stat, index) => (
						<div key={index} className="flex flex-col">
							<span className="text-3xl md:text-4xl font-display font-bold text-white">
								{stat.value}
							</span>
							<span className="text-sm text-gray-500 font-mono uppercase tracking-wider">
								{stat.label}
							</span>
						</div>
					))}
				</motion.div>
			</div>

			{/* Crystals */}
			<Crystal
				imageName="img1"
				useScaling={decorativeOnly}
				customCss={{
					top: "-7.5%",
					right: "-2%",
					width: "600px",
					opacity: 1,
					zIndex: 0,
				}}
				rotate={10}
			/>
		</section>
	);
};

export default Hero;
