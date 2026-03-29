import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CaseStudy } from "../types";
import Crystal from "../components/Crystal";
import SectionBadge from "../components/shared/SectionBadge";
import ContactFooter from "../components/ContactFooter";

const CaseStudies: React.FC = () => {
	const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadCaseStudies = async () => {
			try {
				const response = await fetch("/assets/data/case-studies.json");
				if (response.ok) {
					const data = await response.json();
					setCaseStudies(data);
				}
			} catch (error) {
				console.error("Error loading case studies:", error);
			} finally {
				setLoading(false);
			}
		};
		loadCaseStudies();
	}, []);

	return (
		<div className="pt-24 min-h-screen relative">
			<Crystal
				imageName="img2"
				customCss={{
					top: "0",
					right: "-10%",
					width: "500px",
					opacity: 0.4,
				}}
				rotate={15}
			/>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className="px-6 md:px-16 mb-12 text-sm text-gray-400 font-display"
			>
				rishab dugar {">"}{" "}
				<span className="text-white">case studies</span>
			</motion.div>

			<section className="relative px-6 md:px-16 w-full max-w-[2560px] mx-auto mb-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-12"
				>
					<SectionBadge className="mb-6">
						<span className="material-icons-outlined text-sm">
							cases
						</span>
						case studies
					</SectionBadge>
					<h1 className="text-4xl md:text-6xl font-display font-medium mb-4">
						Case <span className="text-purple-400">Studies</span>
					</h1>
					<p className="text-gray-400 max-w-2xl">
						Deep dives into the systems I've built — the problems,
						solutions, and outcomes.
					</p>
				</motion.div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="glass-card rounded-2xl h-96 animate-pulse"
							/>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{caseStudies.map((study, index) => (
							<motion.div
								key={study.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="group"
							>
								<Link to={`/case-studies/${study.id}`}>
									<motion.div
										whileHover={{ y: -10 }}
										className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 hover:border-purple-500/30 transition-colors duration-300"
									>
										<div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
											{study.images[0] && (
												<img
													src={study.images[0]}
													alt={study.title}
													className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
												/>
											)}
										</div>

										<div className="p-6 flex flex-col flex-grow">
											<h3 className="text-xl font-display font-medium mb-2 group-hover:text-purple-300 transition-colors">
												{study.title}
											</h3>
											<p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
												{study.description}
											</p>

											<div className="flex flex-wrap gap-2 mb-4">
												{study.techStack
													.slice(0, 3)
													.map((tech, i) => (
														<span
															key={i}
															className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
														>
															{tech}
														</span>
													))}
												{study.techStack.length > 3 && (
													<span className="px-2 py-1 text-xs text-gray-500">
														+
														{study.techStack
															.length - 3}{" "}
														more
													</span>
												)}
											</div>

											<div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-purple-400 mt-auto">
												Read Case Study
												<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
													arrow_forward
												</span>
											</div>
										</div>
									</motion.div>
								</Link>
							</motion.div>
						))}
					</div>
				)}
			</section>

			<ContactFooter />
		</div>
	);
};

export default CaseStudies;
