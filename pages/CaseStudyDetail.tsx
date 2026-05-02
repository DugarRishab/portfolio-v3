import React, { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { CaseStudy, CaseStudySection } from "../types";
import Crystal from "../components/Crystal";
import ContactFooter from "../components/ContactFooter";
import {
	RevealOnScroll,
	AnimatedLine,
} from "../components/shared/AnimatedElements";
import CodeBlock from "../components/shared/CodeBlock";
import Callout from "../components/shared/Callout";
import TableOfContents from "../components/shared/TableOfContents";
import MermaidDiagram from "../components/shared/MermaidDiagram";
import Breadcrumb from "../components/shared/Breadcrumb";

const calculateReadingTime = (text: string): string => {
	const wordsPerMinute = 200;
	const words = text.split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return `${minutes} min read`;
};

interface MetricCardProps {
	value: string;
	label: string;
	icon?: string;
	delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
	value,
	label,
	icon,
	delay = 0,
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ delay }}
		className="glass-card p-6 rounded-xl border border-white/10 text-center group hover:border-purple-500/30 transition-colors"
	>
		{icon && (
			<span className="material-icons-outlined text-2xl text-purple-400 mb-2 block group-hover:scale-110 transition-transform">
				{icon}
			</span>
		)}
		<div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
			{value}
		</div>
		<div className="text-sm text-gray-500 font-mono uppercase tracking-wider">
			{label}
		</div>
	</motion.div>
);

// Figure component for paper-style captions
const Figure: React.FC<{ caption: string; id?: string; children: React.ReactNode }> = ({
	caption,
	id,
	children,
}) => (
	<figure className="my-8" id={id}>
		{children}
		<figcaption className="text-center text-sm text-gray-400 mt-4 font-serif italic">
			{caption}
		</figcaption>
	</figure>
);

// Definition list for technical specifications
const DefinitionList: React.FC<{ definitions: { term: string; definition: string }[] }> = ({
	definitions,
}) => (
	<dl className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 p-4 bg-white/5 rounded-lg border border-white/10">
		{definitions.map((def, i) => (
			<div key={i} className="flex flex-col">
				<dt className="text-xs font-mono text-purple-400 uppercase tracking-wider">{def.term}</dt>
				<dd className="text-sm text-gray-300 mt-1">{def.definition}</dd>
			</div>
		))}
	</dl>
);

// Citation component
const Citation: React.FC<{ id: string; text: string; url?: string }> = ({ id, text, url }) => (
	<li className="text-sm text-gray-400 mb-2">
		<span className="text-purple-400 font-mono">{id}</span>{" "}
		{url ? (
			<a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
				{text}
			</a>
		) : (
			<span>{text}</span>
		)}
	</li>
);

// Section Renderer with paper/blog style support
const SectionRenderer: React.FC<{ section: CaseStudySection }> = ({
	section,
}) => {
	switch (section.type) {
		case "heading": {
			const level = section.headerLevel || 2;
			const className = `font-display font-semibold text-white mt-12 mb-6 ${
				level === 2
					? "text-2xl md:text-3xl border-b border-white/10 pb-4"
					: level === 3
						? "text-xl md:text-2xl text-purple-300"
						: "text-lg md:text-xl text-gray-300"
			}`;
			if (level === 2)
				return <h2 className={className}>{section.title}</h2>;
			if (level === 3)
				return <h3 className={className}>{section.title}</h3>;
			return <h4 className={className}>{section.title}</h4>;
		}
		case "subheading": {
			const level = section.headerLevel || 3;
			const className =
				"font-display font-medium text-white mt-8 mb-4 text-lg md:text-xl";
			if (level === 3)
				return <h3 className={className}>{section.title}</h3>;
			return <h4 className={className}>{section.title}</h4>;
		}
		case "text":
			return (
				<div className="prose-content">
					{section.title && (
						<h4 className="text-lg font-display font-medium text-white mb-3">
							{section.title}
						</h4>
					)}
					<p className="text-gray-300 leading-relaxed font-serif text-base">
						{section.content}
					</p>
				</div>
			);
		case "code":
			if (section.code) {
				return (
					<CodeBlock
						code={section.code.code}
						language={section.code.language}
						filename={section.code.filename}
					/>
				);
			}
			return (
				<CodeBlock
					code={section.content || ""}
					language={section.language}
					filename={section.title}
				/>
			);
		case "callout":
			return (
				<Callout
					variant={section.variant || "info"}
					title={section.title}
				>
					{section.content}
				</Callout>
			);
		case "list":
			return (
				<div className="my-6">
					{section.title && (
						<h4 className="text-lg font-display font-medium text-white mb-3">
							{section.title}
						</h4>
					)}
					<ul className="space-y-3">
						{section.items?.map((item, i) => (
							<li
								key={i}
								className="flex items-start gap-3 text-gray-300 font-serif"
							>
								<span className="text-purple-400 mt-1.5 text-xs">
									●
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			);
		case "image":
			return (
				<Figure caption={section.imageCaption || ""}>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="rounded-xl overflow-hidden border border-white/10"
					>
						<img
							src={section.imageUrl}
							alt={section.imageCaption || ""}
							className="w-full h-auto"
						/>
					</motion.div>
				</Figure>
			);
		case "mermaid":
			if (section.mermaidCode) {
				return (
					<Figure
						caption={section.figureCaption || "System Diagram"}
						id={section.figureId}
					>
						<div className="bg-gray-900/50 rounded-xl p-6 border border-white/10 overflow-x-auto">
							<MermaidDiagram chart={section.mermaidCode} />
						</div>
					</Figure>
				);
			}
			return null;
		case "figure":
			return (
				<Figure
					caption={section.figureCaption || ""}
					id={section.figureId}
				>
					{section.content && (
						<div className="text-gray-300 leading-relaxed">
							{section.content}
						</div>
					)}
				</Figure>
			);
		case "definition-list":
			if (section.definitions) {
				return <DefinitionList definitions={section.definitions} />;
			}
			return null;
		case "quote":
			return (
				<blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-8 italic text-gray-300 font-serif text-lg">
					{section.quote}
					{section.author && (
						<footer className="text-sm text-gray-500 mt-2 not-italic">
							— {section.author}
							{section.source && `, ${section.source}`}
						</footer>
					)}
				</blockquote>
			);
		default:
			return null;
	}
};

const CaseStudyDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
	const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>([]);
	const [loading, setLoading] = useState(true);

	const { scrollYProgress } = useScroll();
	const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
	const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

	useEffect(() => {
		const loadCaseStudy = async () => {
			try {
				const response = await fetch("/assets/data/case-studies.json");
				if (response.ok) {
					const data: CaseStudy[] = await response.json();
					setAllCaseStudies(data);
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

	const readingTime = useMemo(() => {
		if (!caseStudy) return "";
		if (caseStudy.readingTime) return caseStudy.readingTime;
		const allText = [
			caseStudy.abstract,
			caseStudy.problem,
			caseStudy.solution,
			caseStudy.outcome,
			caseStudy.conclusion,
		]
			.filter(Boolean)
			.join(" ");
		return calculateReadingTime(allText);
	}, [caseStudy]);

	const tocItems = useMemo(() => {
		const items: { id: string; label: string }[] = [];

		if (caseStudy?.abstract) {
			items.push({ id: "abstract", label: "Abstract" });
		}
		if (caseStudy?.problem) {
			items.push({ id: "problem", label: "Problem Statement" });
		}
		if (caseStudy?.solution) {
			items.push({ id: "solution", label: "Solution" });
		}
		if (caseStudy?.architecture?.length) {
			items.push({ id: "architecture", label: "Architecture" });
		}
		if (caseStudy?.implementation?.length) {
			items.push({ id: "implementation", label: "Implementation" });
		}
		if (caseStudy?.apiReference?.length) {
			items.push({ id: "api", label: "API Reference" });
		}
		if (caseStudy?.outcome) {
			items.push({ id: "outcome", label: "Results" });
		}
		if (caseStudy?.metrics?.length) {
			items.push({ id: "metrics", label: "Metrics" });
		}
		if (caseStudy?.conclusion) {
			items.push({ id: "conclusion", label: "Conclusion" });
		}
		items.push({ id: "stack", label: "Tech Stack" });

		return items;
	}, [caseStudy]);

	const relatedStudies = useMemo(() => {
		if (!caseStudy?.relatedStudies?.length) return [];
		return allCaseStudies.filter((s) =>
			caseStudy.relatedStudies?.includes(s.id),
		);
	}, [caseStudy, allCaseStudies]);

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
		<div className="pt-24 min-h-screen w-full">
			
			{/* Animated background elements */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
			</div>

			<Crystal
				imageName="img3"
				customCss={{
					top: "200px",
					left: "0px",
					width: "600px",
					opacity: 1,
					zIndex: 0,
				}}
				rotate={0}
			/>

			{/* Table of Contents - Fixed sidebar */}

			<article className="px-4 sm:px-6 md:px-16 w-full mx-auto mb-20 flex flex-col md:flex-row justify-center gap-4 md:gap-10">
				<div className="hidden lg:block">
					<TableOfContents items={tocItems} />
				</div>
			
			<div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl">
					{/* Breadcrumb */}
					<Breadcrumb
						items={[
							{ label: 'rishab dugar', href: '/' },
							{ label: 'case studies', href: '/case-studies' },
							{ label: caseStudy.title.toLowerCase() },
						]}
						className="mb-8 text-xs sm:text-sm overflow-x-auto"
					/>

					{/* Header - Paper/Blog Style */}
					<motion.header
						style={{ opacity: headerOpacity }}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						{/* Category Tags */}
						{caseStudy.tags && caseStudy.tags.length > 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex flex-wrap gap-2 mb-6"
							>
								{caseStudy.tags.map((tag, i) => (
									<span
										key={i}
										className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full"
									>
										{tag}
									</span>
								))}
							</motion.div>
						)}

						{/* Paper Title Style */}
						<motion.h1
							className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4 leading-tight text-white"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							{caseStudy.title}
						</motion.h1>

						{caseStudy.subtitle && (
						<motion.p
							className="text-lg sm:text-xl md:text-2xl text-purple-400 font-light mb-6 italic font-serif"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}
						>
							{caseStudy.subtitle}
						</motion.p>
					)}

						{/* Meta info bar - Paper style */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 font-mono border-t border-b border-white/10 py-4"
					>
							<div className="flex items-center gap-2">
								<span className="material-icons-outlined text-base text-purple-400">
									schedule
								</span>
								<span>{readingTime}</span>
							</div>
							{caseStudy.publishedDate && (
								<div className="flex items-center gap-2">
									<span className="material-icons-outlined text-base text-purple-400">
										calendar_today
									</span>
									<span>
										Published {caseStudy.publishedDate}
									</span>
								</div>
							)}
							<div className="flex items-center gap-2">
								<span className="material-icons-outlined text-base text-purple-400">
									code
								</span>
								<span>
									{caseStudy.techStack.length} technologies
								</span>
							</div>
						</motion.div>
					</motion.header>

					{/* Hero Image */}
					{caseStudy.images[0] && (
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="mb-16 rounded-xl overflow-hidden border border-white/10"
						>
							<img
								src={caseStudy.images[0]}
								alt={caseStudy.title}
								className="w-full h-auto"
							/>
						</motion.div>
					)}

					{/* Abstract - Paper Style */}
					{caseStudy.abstract && (
						<motion.section
							id="abstract"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10"
						>
							<h2 className="text-center text-sm  uppercase tracking-widest text-purple-400 mb-4">
								Abstract
							</h2>
							<p className="text-gray-300 leading-relaxed text-base text-center max-w-3xl mx-auto">
								{caseStudy.abstract}
							</p>
						</motion.section>
					)}

					<AnimatedLine className="mb-12" />

					{/* Main Content - Paper/Blog Style */}
					<div className="space-y-8">
						{/* Problem Section */}
						{caseStudy.problem && (
							<RevealOnScroll direction="up">
								<section id="problem" className="relative">
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-mono text-red-400 uppercase tracking-wider">
											§1
										</span>
										<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
											Problem Statement
										</h2>
									</div>
									<p className="text-gray-300 leading-relaxed text-base sm:text-lg font-serif">
										{caseStudy.problem}
									</p>
									{caseStudy.problemDetails?.map(
										(section, i) => (
											<SectionRenderer
												key={i}
												section={section}
											/>
										),
									)}
								</section>
							</RevealOnScroll>
						)}

						{/* Solution Section */}
						{caseStudy.solution && (
							<RevealOnScroll direction="up" delay={0.1}>
								<section id="solution" className="relative">
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
											§2
										</span>
										<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
											Solution
										</h2>
									</div>
									<p className="text-gray-300 leading-relaxed text-base sm:text-lg font-serif">
										{caseStudy.solution}
									</p>
									{caseStudy.solutionDetails?.map(
										(section, i) => (
											<SectionRenderer
												key={i}
												section={section}
											/>
										),
									)}
								</section>
							</RevealOnScroll>
						)}

						{/* Architecture Section */}
						{caseStudy.architecture &&
							caseStudy.architecture.length > 0 && (
								<RevealOnScroll direction="up" delay={0.15}>
									<section
										id="architecture"
										className="relative"
									>
										<div className="flex items-center gap-3 mb-4">
											<span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
												§3
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
												Architecture
											</h2>
										</div>
										{caseStudy.architecture.map(
											(section, i) => (
												<SectionRenderer
													key={i}
													section={section}
												/>
											),
										)}
									</section>
								</RevealOnScroll>
							)}

						{/* Implementation Section */}
						{caseStudy.implementation &&
							caseStudy.implementation.length > 0 && (
								<RevealOnScroll direction="up" delay={0.2}>
								<section
									id="implementation"
									className="relative"
								>
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
											§4
										</span>
										<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
											Implementation
										</h2>
									</div>
										{caseStudy.implementation.map(
											(section, i) => (
												<SectionRenderer
													key={i}
													section={section}
												/>
											),
										)}
									</section>
								</RevealOnScroll>
							)}

						{/* API Reference Section */}
						{caseStudy.apiReference &&
							caseStudy.apiReference.length > 0 && (
								<RevealOnScroll direction="up" delay={0.2}>
									<section id="api" className="relative">
										<div className="flex items-center gap-3 mb-4">
											<span className="text-xs font-mono text-green-400 uppercase tracking-wider">
												§5
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
												API Reference
											</h2>
										</div>
										{caseStudy.apiReference.map(
											(section, i) => (
												<SectionRenderer
													key={i}
													section={section}
												/>
											),
										)}
									</section>
								</RevealOnScroll>
							)}

						{/* Outcome Section */}
						{caseStudy.outcome && (
							<RevealOnScroll direction="up" delay={0.25}>
								<section id="outcome" className="relative">
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-mono text-green-400 uppercase tracking-wider">
											§6
										</span>
										<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
											Results
										</h2>
									</div>
									<p className="text-gray-300 leading-relaxed text-base sm:text-lg font-serif">
										{caseStudy.outcome}
									</p>
									{caseStudy.outcomeDetails?.map(
										(section, i) => (
											<SectionRenderer
												key={i}
												section={section}
											/>
										),
									)}
								</section>
							</RevealOnScroll>
						)}

						{/* Metrics Section */}
						{caseStudy.metrics && caseStudy.metrics.length > 0 && (
							<RevealOnScroll direction="up" delay={0.28}>
								<section id="metrics" className="py-8">
									<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-8 text-white">
										Key Metrics
									</h2>
									<div className="grid grid-cols-2 gap-3 sm:gap-4">
										{caseStudy.metrics.map((metric, i) => (
											<MetricCard
												key={i}
												value={metric.value}
												label={metric.label}
												icon={metric.icon}
												delay={i * 0.1}
											/>
										))}
									</div>
								</section>
							</RevealOnScroll>
						)}

						{/* Conclusion Section */}
						{caseStudy.conclusion && (
							<RevealOnScroll direction="up" delay={0.3}>
								<section id="conclusion" className="relative">
									<div className="flex items-center gap-3 mb-4">
										<span className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
											§7
										</span>
										<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
											Conclusion
										</h2>
									</div>
									<p className="text-gray-300 leading-relaxed text-base sm:text-lg font-serif">
										{caseStudy.conclusion}
									</p>
								</section>
							</RevealOnScroll>
						)}

						{/* Tech Stack Section */}
						<RevealOnScroll direction="up" delay={0.35}>
							<section id="stack" className="relative">
								<div className="flex items-center gap-3 mb-6">
									<span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
										§8
									</span>
									<h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white">
										Technologies
									</h2>
								</div>
								<div className="flex flex-wrap gap-2 sm:gap-3">
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
											whileHover={{ scale: 1.05 }}
											className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-gray-300 hover:border-purple-500/50 hover:text-white transition-all cursor-default font-mono"
										>
											{tech}
										</motion.span>
									))}
								</div>
							</section>
						</RevealOnScroll>

						{/* Citations */}
						{caseStudy.citations &&
							caseStudy.citations.length > 0 && (
								<RevealOnScroll direction="up" delay={0.4}>
									<section className="mt-12 pt-8 border-t border-white/10">
										<h3 className="text-lg font-display font-medium mb-4 text-gray-400">
											References
										</h3>
										<ol className="list-none">
											{caseStudy.citations.map(
												(citation, i) => (
													<Citation
														key={i}
														{...citation}
													/>
												),
											)}
										</ol>
									</section>
								</RevealOnScroll>
							)}

						{/* Links Section */}
						{(caseStudy.links.live ||
							caseStudy.links.github ||
							caseStudy.links.docs ||
							caseStudy.links.paper) && (
							<RevealOnScroll direction="up" delay={0.45}>
								<div className="flex flex-wrap gap-2 sm:gap-4 pt-8 border-t border-white/10">
									{caseStudy.links.paper && (
									<motion.a
										href={caseStudy.links.paper}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base bg-amber-500/20 border border-amber-500/50 text-amber-300 font-medium rounded-full hover:bg-amber-500/30 transition-colors inline-flex items-center gap-2"
									>
											<span className="material-icons-outlined text-sm">
												description
											</span>
											Read Paper
										</motion.a>
									)}
									{caseStudy.links.live && (
										<motion.a
											href={caseStudy.links.live}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base bg-purple-500 text-white font-medium rounded-full hover:bg-purple-400 transition-colors inline-flex items-center gap-2 shadow-lg shadow-purple-500/25"
										>
											<span className="material-icons-outlined text-sm">
												open_in_new
											</span>
											View Live
										</motion.a>
									)}
									{caseStudy.links.github && (
										<motion.a
											href={caseStudy.links.github}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base border border-white/20 text-white font-medium rounded-full hover:border-purple-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2"
										>
											<span className="material-icons-outlined text-sm">
												code
											</span>
											View Source
										</motion.a>
									)}
									{caseStudy.links.docs && (
										<motion.a
											href={caseStudy.links.docs}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.98 }}
											className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base border border-white/20 text-white font-medium rounded-full hover:border-blue-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
										>
											<span className="material-icons-outlined text-sm">
												menu_book
											</span>
											Documentation
										</motion.a>
									)}
								</div>
							</RevealOnScroll>
						)}
					</div>

					{/* Related Studies */}
					{relatedStudies.length > 0 && (
						<motion.section
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mt-20 pt-12 border-t border-white/10"
						>
							<h3 className="text-xl sm:text-2xl font-display font-medium mb-8 text-white">
								Related Case Studies
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
								{relatedStudies.map((study) => (
									<Link
										key={study.id}
										to={`/case-studies/${study.id}`}
										className="group"
									>
										<motion.div
											whileHover={{ y: -4 }}
											className="glass-card p-4 sm:p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all"
										>
											<h4 className="text-base sm:text-lg font-display font-medium text-white group-hover:text-purple-300 transition-colors mb-2">
												{study.title}
											</h4>
											<p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
												{study.description}
											</p>
											<div className="flex items-center gap-2 mt-4 text-sm text-purple-400">
												<span>Read more</span>
												<span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
													arrow_forward
												</span>
											</div>
										</motion.div>
									</Link>
								))}
							</div>
						</motion.section>
					)}

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
};

export default CaseStudyDetail;
