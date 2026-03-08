import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';
import SectionBadge from './shared/SectionBadge';

const About: React.FC = () => {
  return (
		<section className="relative py-20 px-6 md:px-16 w-full max-w-7xl mx-auto">
			<div className="flex gap-16 relative z-10 ">
				<div className="flex-grow">
					<SectionBadge
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-8"
					>
						<span className="material-icons-outlined text-sm">
							person
						</span>
						about me
					</SectionBadge>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-10 leading-tight w-[80%] mouseHover"
					>
						I thrive on crafting{" "}
						<span className="text-purple-400">
							innovative digital experiences
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-lg text-gray-400 leading-relaxed mb-10 max-w-[80%]"
					>
						I'm a passionate software developer with expertise in UI
						development, backend systems, and full-stack web
						applications. With over 12+ successful projects ranging
						from client onboarding wizards to Bitcoin wallets and
						e-commerce solutions
					</motion.p>

					<motion.a
						href="#work"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-purple-400 hover:border-purple-400 transition-colors"
					>
						View full work experience
						<span className="material-icons-outlined text-sm">
							arrow_forward
						</span>
					</motion.a>
				</div>

				<div className="absolute hidden lg:block w-full h-full z-[-1]">
					{/* Crystal floating on the right side of About text */}
					<Crystal
						imageName="img2"
						customCss={{
							top: "-30%",
							right: "-15%",
							width: "400px",
							opacity: 1,
							zIndex: 0,
						}}
						rotate={-4.5}
						scale={1}
					/>
					<Crystal
						imageName="img3"
						customCss={{
							bottom: "-80%",
							left: "-10%",
							width: "300px",
							opacity: 1,
							zIndex: 0,
						}}
						rotate={0}
						scale={1.5}
					/>
				</div>
			</div>
		</section>
  );
};

export default About;