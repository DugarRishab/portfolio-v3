import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';

const SOCIAL_LINKS = [
	{ name: "GitHub", url: "https://github.com/DugarRishab", logo: "github" },
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/dugar-rishab",
		logo: "/assets/logo/linkedin.png",
		isLocal: true,
	},
	{ name: "X", url: "https://x.com/RishabDugar5", logo: "x" },
];

const ContactFooter: React.FC<{ decorativeOnly?: boolean }> = ({
	decorativeOnly = false,
}) => {
	if (decorativeOnly) {
		return (
			<Crystal
				imageName="img6"
				useScaling
				customCss={{
					bottom: "0%",
					right: "-5%",
					width: "300px",
					opacity: 1,
				}}
				rotate={0}
				scale={2}
			/>
		);
	}

	return (
		<footer
			className="relative pt-32 pb-10 px-6 md:px-16 overflow-hidden"
			id="contact"
		>
			<Crystal
				imageName="img6"
				customCss={{
					bottom: "0%",
					right: "-5%",
					width: "300px",
					opacity: 1,
				}}
				rotate={0}
				scale={2}
			/>

			<section className="relative py-20 px-6 md:px-16 w-full max-w-[1400px] mx-auto">
				{/* Main CTA */}
				<div className="text-center mb-16">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-purple-400 font-mono text-sm mb-4 uppercase tracking-wider"
					>
						Let's work together
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-4xl md:text-6xl font-display font-medium mb-4"
					>
						Have a project in mind?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-gray-400 max-w-xl mx-auto mb-8"
					>
						Whether you need automation systems, AI integrations, or
						scalable backend infrastructure — I'm here to help turn
						your ideas into production-ready solutions.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="flex flex-wrap justify-center gap-4"
					>
						<a
							href="mailto:rishabdugar.work@gmail.com"
							className="group px-8 py-4 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-600 transition-all duration-300 flex items-center gap-2"
						>
							<span className="material-icons-outlined text-lg">
								mail
							</span>
							Get in Touch
						</a>
						<a
							href="https://cal.com/rishab-dugar/15min"
							target="_blank"
							rel="noopener noreferrer"
							className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
						>
							<span className="material-icons-outlined text-lg">
								calendar_today
							</span>
							Schedule a Call
						</a>
					</motion.div>
				</div>

				{/* Contact Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="glass-card rounded-2xl p-8 md:p-10 border border-white/10 max-w-4xl mx-auto"
				>
					<div className="grid md:grid-cols-3 gap-8">
						{/* Email */}
						<div className="text-center md:text-left">
							<span className="text-gray-500 text-xs font-mono uppercase tracking-wider">
								Email
							</span>
							<a
								href="mailto:rishabdugar.work@gmail.com"
								className="block text-white hover:text-purple-400 transition-colors mt-1 font-medium"
							>
								rishabdugar.work@gmail.com
							</a>
						</div>

						{/* Location */}
						<div className="text-center">
							<span className="text-gray-500 text-xs font-mono uppercase tracking-wider">
								Location
							</span>
							<p className="text-white mt-1 font-medium">
								India (UTC+5:30)
							</p>
							<p className="text-gray-400 text-sm">
								Open to remote work worldwide
							</p>
						</div>

						{/* Social */}
						<div className="text-center md:text-right">
							<span className="text-gray-500 text-xs font-mono uppercase tracking-wider">
								Connect
							</span>
							<div className="flex justify-center md:justify-end gap-3 mt-2">
								{SOCIAL_LINKS.map((link) => (
									<a
										key={link.name}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
										title={link.name}
									>
										<img
											src={link.isLocal ? link.logo : `https://cdn.simpleicons.org/${link.logo}/ffffff`}
											alt={link.name}
											className="w-5 h-5"
											loading="lazy"
										/>
									</a>
								))}
							</div>
						</div>
					</div>
				</motion.div>

				{/* Footer bottom */}
				<div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2">
						<span className="text-white font-display font-bold">
							rishab dugar
						</span>
						<span className="text-gray-600">•</span>
						<span className="text-gray-500 text-sm">
							Full-Stack Engineer
						</span>
					</div>
					<div className="text-xs text-gray-600">
						&copy; {new Date().getFullYear()} Rishab Dugar. Built
						with love ❤️	
					</div>
				</div>
			</section>
		</footer>
	);
};

export default ContactFooter;