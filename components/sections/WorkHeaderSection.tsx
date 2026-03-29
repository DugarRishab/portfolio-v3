import React from 'react';
import { motion } from 'framer-motion';
import Crystal from '../Crystal';
import { CRYSTAL_IMAGES } from '../../constants-new';
import { NodeIcon, ReactIcon, AWSIcon } from '../shared/TechIcons';

const WorkHeaderSection: React.FC = () => {
  return (
		<section className="relative px-6 md:px-16 mb-24 min-h-[60vh] flex flex-col justify-center">
			{/* Decorative Crystals */}
			<div className="absolute top-0 right-[-10%] md:right-[-5%] w-[60%] md:w-[45%] h-full z-0 pointer-events-none">
				<Crystal
					src={CRYSTAL_IMAGES.img1}
					className="w-full h-full object-cover opacity-90"
					rotate={-15}
				/>
			</div>

			<div className="relative z-10 max-w-4xl">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="text-sm text-gray-400 font-display mb-12 font-bold tracking-wide"
				>
					rishab dugar {">"} <span className="text-white">work</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-6xl md:text-8xl font-display font-bold leading-tight mb-4 tracking-tight"
				>
					Work & <br /> Projects
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-gray-500 font-bold tracking-widest uppercase text-xl md:text-2xl mb-12"
				>
					4 YEARS OF EXPERIENCE
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="flex gap-8 text-white"
				>
					<div className="flex items-center gap-2">
						<NodeIcon className="w-8 h-8 md:w-10 md:h-10" />
						<span className="sr-only">Node.js</span>
					</div>
					<div className="flex items-center gap-2">
						<ReactIcon className="w-8 h-8 md:w-10 md:h-10" />
						<span className="sr-only">React</span>
					</div>
					<div className="flex items-center gap-2">
						<AWSIcon className="w-8 h-8 md:w-10 md:h-10" />
						<span className="sr-only">AWS</span>
					</div>
				</motion.div>
			</div>
		</section>
  );
};

export default WorkHeaderSection;
