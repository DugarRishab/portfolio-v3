import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { CaseStudy } from "../types";
import Crystal from "../components/Crystal";
import SectionBadge from "../components/shared/SectionBadge";
import ContactFooter from "../components/ContactFooter";
import {
	RevealOnScroll,
	AnimatedLine,
} from "../components/shared/AnimatedElements";
import {
	AutomationPipelineDiagram,
	MicroservicesDiagram,
	PaymentFlowDiagram,
} from "../components/diagrams/ArchitectureDiagram";

const CaseStudyDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
	const [loading, setLoading] = useState(true);

	// Hooks must be called before any conditional returns
	const { scrollYProgress } = useScroll();
	const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
	const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

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
		<div className="pt-24 min-h-screen relative overflow-hidden">
			{/* Animated background elements */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
			</div>

			<Crystal
				imageName="img3"
				customCss={{
					top: "0",
					right: "-15%",
					width: "600px",
					opacity: 0.4,
					zIndex: 0,
				}}
				rotate={-10}
			/>

			<article className="relative px-6 md:px-16 w-full mx-auto mb-20">
				<div className="max-w-[1000px] mx-auto">
					{/* Breadcrumb */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="mb-8 text-sm text-gray-500 font-mono flex items-center gap-2"
					>
						<Link
							to="/"
							className="hover:text-white transition-colors"
						>
							rishab dugar
						</Link>
						<span className="text-gray-600">/</span>
						<Link
							to="/case-studies"
							className="hover:text-white transition-colors"
						>
							case studies
						</Link>
						<span className="text-gray-600">/</span>
						<span className="text-white">
							{caseStudy.title.toLowerCase()}
						</span>
					</motion.div>
					{/* Header */}
					<motion.header
						style={{ opacity: headerOpacity, scale: headerScale }}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								description
							</span>
							case study
						</SectionBadge>

						<motion.h1
							className="text-4xl md:text-6xl font-display font-medium mb-6 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							{caseStudy.title}
						</motion.h1>

						<motion.p
							className="text-xl text-gray-400 leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{caseStudy.description}
						</motion.p>
					</motion.header>

					{/* Hero Image with parallax effect */}
					{caseStudy.images[0] && (
						<motion.div
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							whileHover={{ scale: 1.02 }}
							className="mb-16 rounded-2xl overflow-hidden border border-white/10 relative group"
						>
							{/* Glow effect */}
							<div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<img
								src={caseStudy.images[0]}
								alt={caseStudy.title}
								className="w-full h-auto relative z-10"
							/>
						</motion.div>
					)}

					<AnimatedLine className="mb-12" />

					{/* Main Content with Timeline-style sections */}
					<div className="space-y-16">
						{/* Problem Section */}
						<RevealOnScroll direction="up">
							<motion.section
								whileHover={{ x: 5 }}
								transition={{ duration: 0.3 }}
								className="relative pl-8 border-l-2 border-red-500/30 hover:border-red-500/60 transition-colors"
							>
								{/* Timeline dot */}
								<motion.div
									className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center"
									whileHover={{ scale: 1.2 }}
								>
									<span className="w-2 h-2 rounded-full bg-red-500" />
								</motion.div>

								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-wider">
										01 / Problem
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-display font-medium mb-4 text-white">
									The Challenge
								</h2>
								<p className="text-gray-400 leading-relaxed text-lg">
									{caseStudy.problem}
								</p>
							</motion.section>
						</RevealOnScroll>

						{/* Solution Section */}
						<RevealOnScroll direction="up" delay={0.1}>
							<motion.section
								whileHover={{ x: 5 }}
								transition={{ duration: 0.3 }}
								className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500/60 transition-colors"
							>
								<motion.div
									className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center"
									whileHover={{ scale: 1.2 }}
								>
									<span className="w-2 h-2 rounded-full bg-blue-500" />
								</motion.div>

								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider">
										02 / Solution
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-display font-medium mb-4 text-white">
									The Approach
								</h2>
								<p className="text-gray-400 leading-relaxed text-lg">
									{caseStudy.solution}
								</p>
							</motion.section>
						</RevealOnScroll>

						{/* Outcome Section */}
						<RevealOnScroll direction="up" delay={0.2}>
							<motion.section
								whileHover={{ x: 5 }}
								transition={{ duration: 0.3 }}
								className="relative pl-8 border-l-2 border-green-500/30 hover:border-green-500/60 transition-colors"
							>
								<motion.div
									className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
									whileHover={{ scale: 1.2 }}
								>
									<span className="w-2 h-2 rounded-full bg-green-500" />
								</motion.div>

								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-wider">
										03 / Outcome
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-display font-medium mb-4 text-white">
									The Results
								</h2>
								<p className="text-gray-400 leading-relaxed text-lg">
									{caseStudy.outcome}
								</p>
							</motion.section>
						</RevealOnScroll>

						{/* Architecture Diagram Section - Show for technical projects */}
						{(caseStudy.id === "client-onboarding-system" ||
							caseStudy.id === "payment-infrastructure" ||
							caseStudy.id === "kronml-ui-platform" ||
							caseStudy.id === "finance-ai-mvp") && (
							<RevealOnScroll direction="up" delay={0.25}>
								<motion.section
									whileHover={{ x: 5 }}
									transition={{ duration: 0.3 }}
									className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500/60 transition-colors"
								>
									<motion.div
										className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center"
										whileHover={{ scale: 1.2 }}
									>
										<span className="w-2 h-2 rounded-full bg-cyan-500" />
									</motion.div>

									<div className="flex items-center gap-3 mb-4">
										<span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
											Architecture
										</span>
									</div>
									<h2 className="text-2xl md:text-3xl font-display font-medium mb-6 text-white">
										System Design
									</h2>

									{caseStudy.id ===
										"payment-infrastructure" && (
										<PaymentFlowDiagram />
									)}
									{caseStudy.id ===
										"client-onboarding-system" && (
										<AutomationPipelineDiagram />
									)}
									{caseStudy.id === "kronml-ui-platform" && (
										<MicroservicesDiagram />
									)}
									{caseStudy.id === "finance-ai-mvp" && (
										<AutomationPipelineDiagram />
									)}
								</motion.section>
							</RevealOnScroll>
						)}

						{/* Tech Stack Section */}
						<RevealOnScroll direction="up" delay={0.3}>
							<motion.section
								whileHover={{ x: 5 }}
								transition={{ duration: 0.3 }}
								className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors"
							>
								<motion.div
									className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center"
									whileHover={{ scale: 1.2 }}
								>
									<span className="w-2 h-2 rounded-full bg-purple-500" />
								</motion.div>

								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-wider">
										04 / Stack
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-display font-medium mb-6 text-white">
									Technologies Used
								</h2>
								<div className="flex flex-wrap gap-3">
									{caseStudy.techStack.map((tech, i) => (
										<motion.span
											key={i}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{
												opacity: 1,
												scale: 1,
											}}
											viewport={{ once: true }}
											transition={{ delay: i * 0.05 }}
											whileHover={{ scale: 1.1, y: -2 }}
											className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:text-white transition-all cursor-default"
										>
											{tech}
										</motion.span>
									))}
								</div>
							</motion.section>
						</RevealOnScroll>

						{/* Links Section */}
						{(caseStudy.links.live || caseStudy.links.github) && (
							<RevealOnScroll direction="up" delay={0.4}>
								<div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
									{caseStudy.links.live && (
										<motion.a
											href={caseStudy.links.live}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="px-8 py-4 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-400 transition-colors inline-flex items-center gap-2 shadow-lg shadow-purple-500/25"
										>
											<span className="material-icons-outlined text-sm">
												open_in_new
											</span>
											View Live Project
										</motion.a>
									)}
									{caseStudy.links.github && (
										<motion.a
											href={caseStudy.links.github}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-purple-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2"
										>
											<span className="material-icons-outlined text-sm">
												code
											</span>
											View Source Code
										</motion.a>
									)}
								</div>
							</RevealOnScroll>
						)}
					</div>

					{/* Back Link */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="mt-16 pt-8 border-t border-white/10"
					>
						<Link
							to="/case-studies"
							className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
						>
							<span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">
								arrow_back
							</span>
							Back to Case Studies
						</Link>
					</motion.div>
				</div>
			</article>

			<ContactFooter />
		</div>
	);
};;;;;

export default CaseStudyDetail;
