import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ServiceDetail as ServiceDetailType } from "../types";
import Crystal from "../components/Crystal";
import SectionBadge from "../components/shared/SectionBadge";
import ContactFooter from "../components/ContactFooter";
import { RevealOnScroll } from "../components/shared/AnimatedElements";

const ServiceDetailPage: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const [service, setService] = useState<ServiceDetailType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadService = async () => {
			try {
				const response = await fetch("/assets/data/services.json");
				if (response.ok) {
					const data: ServiceDetailType[] = await response.json();
					const found = data.find((s) => s.slug === slug);
					setService(found || null);
				}
			} catch (error) {
				console.error("Error loading service:", error);
			} finally {
				setLoading(false);
			}
		};
		loadService();
	}, [slug]);

	if (loading) {
		return (
			<div className="pt-24 min-h-screen relative">
				<div className="px-6 md:px-16 max-w-[1200px] mx-auto">
					<div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-8" />
					<div className="h-16 w-3/4 bg-white/5 rounded animate-pulse mb-4" />
					<div className="h-6 w-1/2 bg-white/5 rounded animate-pulse mb-8" />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
						))}
					</div>
				</div>
			</div>
		);
	}

	if (!service) {
		return (
			<div className="pt-24 min-h-screen relative flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-display font-medium mb-4">
						Service Not Found
					</h1>
					<Link
						to="/"
						className="text-purple-400 hover:underline"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-24 min-h-screen relative overflow-hidden">
			{/* Background grid */}
			{/* <div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
			</div> */}
			<Crystal
				imageName="img2"
				customCss={{
					top: "0%",
					right: "0%",
					width: "50%",
					opacity: 1,
					zIndex: 0,
				}}
				rotate={0}
				scale={1}
			/>

			<Crystal
				imageName="img3"
				customCss={{
					top: "30%",
					left: "0%",
					width: "500px",
					opacity: 1,
					zIndex: 0,
				}}
				// rotate={-10}
			/>

			<article className="relative px-6 md:px-16 w-full mx-auto mb-20">
				<div className="max-w-[1200px] mx-auto">
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
						<span className="text-white">
							{service.title.toLowerCase()}
						</span>
					</motion.div>

					{/* Hero Section */}
					<motion.header
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-16"
					>
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								{service.icon}
							</span>
							service
						</SectionBadge>

						<motion.h1
							className="text-4xl md:text-6xl font-display font-medium mb-4 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							{service.title}
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-purple-400 font-medium mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}
						>
							{service.tagline}
						</motion.p>

						<motion.p
							className="text-lg text-gray-400 leading-relaxed max-w-3xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{service.description}
						</motion.p>
					</motion.header>

					{/* Use Cases Grid */}
					<RevealOnScroll direction="up">
						<section className="mb-20">
							<div className="flex items-center gap-3 mb-8">
								<span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-wider">
									What I Can Build
								</span>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{service.useCases.map((useCase, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.05 }}
										whileHover={{
											y: -5,
											transition: { duration: 0.2 },
										}}
										className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all duration-300"
									>
										<div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
											<span className="material-icons-outlined text-xl text-purple-400">
												{useCase.icon}
											</span>
										</div>
										<h3 className="text-lg font-display font-semibold mb-2 text-white">
											{useCase.title}
										</h3>
										<p className="text-gray-400 text-sm leading-relaxed">
											{useCase.description}
										</p>
									</motion.div>
								))}
							</div>
						</section>
					</RevealOnScroll>

					{/* CTA Section */}
					<section className="relative py-20 mb-5">
						<div className="max-w-[1200px] mx-auto">
							<RevealOnScroll direction="up">
								<div className="glass-card rounded-3xl p-10 md:p-10 border border-purple-500/30 text-center relative overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5" />
									<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
										<div className="text-left">
											<h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
												{service.cta.headline}
											</h2>
											<p className="text-gray-400 max-w-xl">
												{service.cta.subtext}
											</p>
										</div>
										<div className="flex flex-row flex-wrap justify-start items-start gap-4">
											<a
												href="mailto:rishabdugar.work@gmail.com"
												className="group px-8 py-4 bg-purple-500 text-white font-medium rounded-full hover:bg-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/25"
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
										</div>
									</div>
								</div>
							</RevealOnScroll>
						</div>
					</section>

					{/* Examples Section */}
					<RevealOnScroll direction="up" delay={0.1}>
						<section className="mb-20">
							<div className="flex items-center gap-3 mb-8">
								<span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider">
									Real Examples
								</span>
							</div>
							<div className="space-y-8">
								{service.examples.map((example, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className="glass-card rounded-2xl border border-white/5 overflow-hidden"
									>
										<div className="p-8">
											<h3 className="text-2xl font-display font-semibold mb-6 text-white">
												{example.title}
											</h3>
											<div className="grid md:grid-cols-3 gap-6">
												<div className="space-y-2">
													<div className="flex items-center gap-2 text-red-400 text-sm font-mono uppercase tracking-wider">
														<span className="w-2 h-2 rounded-full bg-red-500" />
														Problem
													</div>
													<p className="text-gray-400 text-sm leading-relaxed">
														{example.problem}
													</p>
												</div>
												<div className="space-y-2">
													<div className="flex items-center gap-2 text-blue-400 text-sm font-mono uppercase tracking-wider">
														<span className="w-2 h-2 rounded-full bg-blue-500" />
														Solution
													</div>
													<p className="text-gray-400 text-sm leading-relaxed">
														{example.solution}
													</p>
												</div>
												<div className="space-y-2">
													<div className="flex items-center gap-2 text-green-400 text-sm font-mono uppercase tracking-wider">
														<span className="w-2 h-2 rounded-full bg-green-500" />
														Outcome
													</div>
													<p className="text-gray-400 text-sm leading-relaxed">
														{example.outcome}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</section>
					</RevealOnScroll>

					{/* Benefits Section */}
					<RevealOnScroll direction="up" delay={0.2}>
						<section className="mb-20">
							<div className="flex items-center gap-3 mb-8">
								<span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-wider">
									Why Choose Me
								</span>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{service.benefits.map((benefit, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.05 }}
										className="text-center p-6"
									>
										<div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
											<span className="material-icons-outlined text-2xl text-purple-400">
												{benefit.icon}
											</span>
										</div>
										<h3 className="text-lg font-display font-semibold mb-2 text-white">
											{benefit.title}
										</h3>
										<p className="text-gray-400 text-sm leading-relaxed">
											{benefit.description}
										</p>
									</motion.div>
								))}
							</div>
						</section>
					</RevealOnScroll>

					{/* Tech Stack */}
					<RevealOnScroll direction="up" delay={0.3}>
						<section className="mb-16">
							<div className="flex items-center gap-3 mb-6">
								<span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
									Tech Stack
								</span>
							</div>
							<div className="flex flex-wrap gap-3">
								{service.techStack.map((tech, index) => (
									<motion.span
										key={index}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.03 }}
										whileHover={{ scale: 1.05, y: -2 }}
										className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:text-white transition-all cursor-default"
									>
										{tech}
									</motion.span>
								))}
							</div>
						</section>
					</RevealOnScroll>

					{/* Back Link */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="pt-8 border-t border-white/10"
					>
						<Link
							to="/"
							className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
						>
							<span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">
								arrow_back
							</span>
							Back to Home
						</Link>
					</motion.div>
				</div>
			</article>

			<ContactFooter />
		</div>
	);
};

export default ServiceDetailPage;
