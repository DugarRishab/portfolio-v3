import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CaseStudy } from "../types";
import Crystal from "../components/Crystal";
import SectionBadge from "../components/shared/SectionBadge";
import ContactFooter from "../components/ContactFooter";
import { AnimatedLine } from "../components/shared/AnimatedElements";
import Breadcrumb from "../components/shared/Breadcrumb";

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	}),
};

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
					opacity: 0.6,
					zIndex: 0,
				}}
				rotate={15}
			/>

			<section className="relative px-6 md:px-16 w-full mx-auto mb-20">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

				<div className="max-w-[1400px] mx-auto">
					{/* Breadcrumb */}
					<Breadcrumb
						items={[
							{ label: 'rishab dugar', href: '/' },
							{ label: 'case studies' },
						]}
						className="mb-8"
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								cases
							</span>
							case studies
						</SectionBadge>
						<motion.h1
							className="text-4xl md:text-6xl font-display font-medium mb-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							Case{" "}
							<span className="text-purple-400">Studies</span>
						</motion.h1>
						<motion.p
							className="text-gray-400 max-w-2xl leading-relaxed text-lg"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							Deep dives into the systems I've built — the
							problems, solutions, and measurable outcomes.
						</motion.p>
					</motion.div>

					{/* <AnimatedLine className="mb-12" delay={0.3} /> */}

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
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							initial="hidden"
							animate="visible"
						>
							<AnimatePresence>
								{caseStudies.map((study, index) => (
									<motion.div
										key={study.id}
										custom={index}
										variants={cardVariants}
										initial="hidden"
										animate="visible"
										className="group"
									>
										<Link to={`/case-studies/${study.id}`}>
											<motion.div
												whileHover={{
													y: -8,
													scale: 1.02,
												}}
												transition={{ duration: 0.3 }}
												className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 hover:border-purple-500/30 transition-all duration-300 relative"
											>
												{/* Glow effect on hover */}
												<div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-purple-500/10 group-hover:to-purple-500/20 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

												<div className="relative z-10">
													{/* Image */}
													{/* <div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
														{study.images[0] && (
															<motion.img
																src={
																	study
																		.images[0]
																}
																alt={
																	study.title
																}
																className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500"
																whileHover={{
																	scale: 1.1,
																}}
																transition={{
																	duration: 0.6,
																}}
															/>
														)}
														{/* Overlay gradient */}
														{/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

														{/* Category badge */}
														{/*<div className="absolute top-3 left-3">
															<span className="px-2 py-1 text-xs bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 font-mono">
																{
																	study
																		.techStack[0]
																}
															</span>
														</div>
													</div> */}

													{/* Content */}
													<div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
														<h3 className="text-xl font-display font-medium mb-2 group-hover:text-purple-300 transition-colors">
															{study.title}
														</h3>
														<p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
															{study.description}
														</p>

														{/* Tech tags with animation */}
														<div className="flex flex-wrap gap-2 mb-4">
															{study.techStack
																.slice(0, 3)
																.map(
																	(
																		tech,
																		i,
																	) => (
																		<motion.span
																			key={
																				i
																			}
																			whileHover={{
																				scale: 1.1,
																			}}
																			className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400 hover:border-purple-500/50 hover:text-purple-300 transition-colors"
																		>
																			{
																				tech
																			}
																		</motion.span>
																	),
																)}
															{study.techStack
																.length > 3 && (
																<span className="px-2 py-1 text-xs text-gray-500">
																	+
																	{study
																		.techStack
																		.length -
																		3}{" "}
																	more
																</span>
															)}
														</div>

														{/* CTA */}
														<div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-purple-400 mt-auto">
															Read Case Study
															<motion.span
																className="material-icons-outlined text-sm"
																initial={{
																	x: 0,
																}}
																whileHover={{
																	x: 5,
																}}
															>
																arrow_forward
															</motion.span>
														</div>
													</div>
												</div>
											</motion.div>
										</Link>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					)}
				</div>
			</section>

			<ContactFooter />
		</div>
	);
};

export default CaseStudies;
