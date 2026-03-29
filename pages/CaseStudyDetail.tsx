import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { CaseStudy } from "../types";
import Crystal from "../components/Crystal";
import SectionBadge from "../components/shared/SectionBadge";
import ContactFooter from "../components/ContactFooter";

const CaseStudyDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadCaseStudy = async () => {
			try {
				const response = await fetch("/assets/data/case-studies.json");
				if (response.ok) {
					const data: CaseStudy[] = await response.json();
					const study = data.find((s) => s.id === id);
					setCaseStudy(study || null);
				}
			} catch (error) {
				console.error("Error loading case study:", error);
			} finally {
				setLoading(false);
			}
		};
		loadCaseStudy();
	}, [id]);

	if (loading) {
		return (
			<div className="pt-24 min-h-screen relative">
				<div className="px-6 md:px-16 max-w-4xl mx-auto">
					<div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-8" />
					<div className="h-12 w-3/4 bg-white/5 rounded animate-pulse mb-4" />
					<div className="h-64 bg-white/5 rounded animate-pulse" />
				</div>
			</div>
		);
	}

	if (!caseStudy) {
		return (
			<div className="pt-24 min-h-screen relative flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-display font-medium mb-4">
						Case Study Not Found
					</h1>
					<Link
						to="/case-studies"
						className="text-purple-400 hover:underline"
					>
						← Back to Case Studies
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-24 min-h-screen relative">
			<Crystal
				imageName="img3"
				customCss={{
					top: "0",
					right: "-15%",
					width: "600px",
					opacity: 0.3,
				}}
				rotate={-10}
			/>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className="px-6 md:px-16 mb-8 text-sm text-gray-400 font-display"
			>
				<Link to="/" className="hover:text-white transition-colors">
					rishab dugar
				</Link>
				{" > "}
				<Link
					to="/case-studies"
					className="hover:text-white transition-colors"
				>
					case studies
				</Link>
				{" > "}
				<span className="text-white">
					{caseStudy.title.toLowerCase()}
				</span>
			</motion.div>

			<article className="px-6 md:px-16 w-full max-w-[2560px] mx-auto mb-20">
				<motion.header
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-12"
				>
					<SectionBadge className="mb-6">
						<span className="material-icons-outlined text-sm">
							description
						</span>
						case study
					</SectionBadge>
					<h1 className="text-4xl md:text-6xl font-display font-medium mb-6">
						{caseStudy.title}
					</h1>
					<p className="text-xl text-gray-300 leading-relaxed">
						{caseStudy.description}
					</p>
				</motion.header>

				{caseStudy.images[0] && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="mb-16 rounded-2xl overflow-hidden border border-white/10"
					>
						<img
							src={caseStudy.images[0]}
							alt={caseStudy.title}
							className="w-full h-auto"
						/>
					</motion.div>
				)}

				<div className="space-y-12">
					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl font-display font-medium mb-4 flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
								<span className="material-icons-outlined text-red-400 text-sm">
									error_outline
								</span>
							</span>
							The Problem
						</h2>
						<p className="text-gray-400 leading-relaxed pl-11">
							{caseStudy.problem}
						</p>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl font-display font-medium mb-4 flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
								<span className="material-icons-outlined text-blue-400 text-sm">
									lightbulb
								</span>
							</span>
							The Solution
						</h2>
						<p className="text-gray-400 leading-relaxed pl-11">
							{caseStudy.solution}
						</p>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl font-display font-medium mb-4 flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
								<span className="material-icons-outlined text-green-400 text-sm">
									trending_up
								</span>
							</span>
							The Outcome
						</h2>
						<p className="text-gray-400 leading-relaxed pl-11">
							{caseStudy.outcome}
						</p>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl font-display font-medium mb-6 flex items-center gap-3">
							<span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
								<span className="material-icons-outlined text-purple-400 text-sm">
									code
								</span>
							</span>
							Tech Stack
						</h2>
						<div className="flex flex-wrap gap-3 pl-11">
							{caseStudy.techStack.map((tech, i) => (
								<span
									key={i}
									className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
								>
									{tech}
								</span>
							))}
						</div>
					</motion.section>

					{(caseStudy.links.live || caseStudy.links.github) && (
						<motion.section
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="flex gap-4 pt-8 border-t border-white/10"
						>
							{caseStudy.links.live && (
								<a
									href={caseStudy.links.live}
									target="_blank"
									rel="noopener noreferrer"
									className="px-6 py-3 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-400 transition-colors inline-flex items-center gap-2"
								>
									View Live
									<span className="material-icons-outlined text-sm">
										open_in_new
									</span>
								</a>
							)}
							{caseStudy.links.github && (
								<a
									href={caseStudy.links.github}
									target="_blank"
									rel="noopener noreferrer"
									className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-purple-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2"
								>
									View Code
									<span className="material-icons-outlined text-sm">
										code
									</span>
								</a>
							)}
						</motion.section>
					)}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="mt-16 pt-8 border-t border-white/10"
				>
					<Link
						to="/case-studies"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
					>
						<span className="material-icons-outlined text-sm">
							arrow_back
						</span>
						Back to Case Studies
					</Link>
				</motion.div>
			</article>

			<ContactFooter />
		</div>
	);
};

export default CaseStudyDetail;
