import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';

interface HeroProps {
	decorativeOnly?: boolean;
}

const Hero: React.FC<HeroProps> = ({ decorativeOnly = false }) => {
	return (
		<section className="relative w-[100%] h-[100vh] flex flex-col justify-center  overflow-hidden">
			{/* Decorative Line */}
			{/* {!decorativeOnly && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: "100vh" }}
					transition={{
						duration: 1,
						delay: 0.5,
						ease: "easeOut",
						repeat: Infinity,
						repeatType: "reverse",
					}}
					className="absolute left-6 md:left-16 top-0 w-[1px] bg-gradient-to-b from-transparent to-purple-500 opacity-100 hidden md:block"
				/>
			)} */}

			<div className="relative p-4 m-20 z-10 w-[70%]">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-tight tracking-tight py-10"
				>
					I build{" "}
					<span className="text-purple-400">AI-powered systems</span>{" "}
					and automations that reduce manual work and scale
					operations.
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 font-light max-w-2xl"
				>
					From lead generation pipelines to internal tools — I design
					and ship systems end-to-end.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex flex-wrap gap-4"
				>
					<a
						href="#work"
						className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-purple-400 hover:text-white transition-colors"
					>
						View Work
					</a>
					<a
						href="#contact"
						className="px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:border-purple-400 hover:text-purple-400 transition-colors"
					>
						Contact Me
					</a>
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