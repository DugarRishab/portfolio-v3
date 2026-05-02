import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getWorkExperienceById } from '@/utils/workexData';
import { WorkExperience } from '@/types';
import ContactFooter from '../components/ContactFooter';

const WorkExperienceDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [workEx, setWorkEx] = useState<WorkExperience | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			if (!id) return;
			const data = await getWorkExperienceById(id);
			if (data) {
				setWorkEx(data);
			} else {
				navigate('/work-experience');
			}
			setLoading(false);
		};
		loadData();
	}, [id, navigate]);

	if (loading) {
		return (
			<div className="pt-32 min-h-screen flex items-center justify-center">
				<div className="text-gray-400">Loading...</div>
			</div>
		);
	}

	if (!workEx) {
		return null;
	}

	return (
		<div className="pt-20 min-h-screen relative overflow-x-hidden">
			{/* Hero Section */}
			<section className="relative px-6 md:px-16 mx-auto py-20">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="mb-8">
							<h1 className="text-5xl md:text-6xl font-display font-medium mb-4">
								{workEx.title}
							</h1>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
								<div>
									<p className="text-2xl text-purple-400 font-semibold mb-2">
										{workEx.company}
									</p>
									<p className="text-gray-400 text-lg">
										{workEx.startDate} — {workEx.endDate}
									</p>
								</div>
							</div>
							<p className="text-xl text-gray-300 leading-relaxed mb-8">
								{workEx.overview}
							</p>
						</div>

						{/* Impact Statement */}
						<div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 mb-12">
							<h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
								Impact
							</h3>
							<p className="text-lg text-white leading-relaxed">
								{workEx.impact}
							</p>
							<p className="text-sm text-gray-400 mt-3">
								— {workEx.impactAuthor}
							</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Key Achievements */}
			{workEx.achievements && workEx.achievements.length > 0 && (
				<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-display font-medium mb-8">
								Key Achievements
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{workEx.achievements.map((achievement, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="flex gap-4"
									>
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mt-1">
											<span className="text-purple-400 text-sm">✓</span>
										</div>
										<p className="text-gray-300 leading-relaxed">
											{achievement}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Key Highlights */}
			{workEx.keyHighlights && workEx.keyHighlights.length > 0 && (
				<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-display font-medium mb-8">
								Key Highlights
							</h2>
							<div className="space-y-4">
								{workEx.keyHighlights.map((highlight, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors"
									>
										<span className="text-purple-400 text-xl mt-1">→</span>
										<p className="text-gray-300 leading-relaxed">
											{highlight}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Responsibilities */}
			<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-display font-medium mb-8">
							Responsibilities
						</h2>
						<div className="space-y-6">
							{workEx.responsibilities.map((resp, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<h3 className="text-xl font-semibold text-purple-300 mb-2">
										{resp.title}
									</h3>
									<p className="text-gray-400 leading-relaxed">
										{resp.description}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Team & Organization */}
			<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-display font-medium mb-8">
							Team & Organization
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{workEx.teamSize && (
								<div className="p-6 rounded-lg bg-white/5 border border-white/10">
									<h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
										Team Size
									</h3>
									<p className="text-xl text-white">
										{workEx.teamSize}
									</p>
								</div>
							)}
							{workEx.reportingTo && (
								<div className="p-6 rounded-lg bg-white/5 border border-white/10">
									<h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
										Reporting To
									</h3>
									<p className="text-xl text-white">
										{workEx.reportingTo}
									</p>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Technologies & Tools */}
			<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-display font-medium mb-8">
							Technologies & Tools
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Technologies */}
							<div>
								<h3 className="text-lg font-semibold text-purple-300 mb-4">
									Technologies
								</h3>
								<div className="flex flex-wrap gap-2">
									{workEx.technologies.map((tech, index) => (
										<motion.span
											key={index}
											initial={{ opacity: 0, scale: 0.9 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium hover:bg-purple-500/20 transition-colors"
										>
											{tech}
										</motion.span>
									))}
								</div>
							</div>

							{/* Tools */}
							{workEx.toolsUsed && workEx.toolsUsed.length > 0 && (
								<div>
									<h3 className="text-lg font-semibold text-purple-300 mb-4">
										Tools Used
									</h3>
									<div className="flex flex-wrap gap-2">
										{workEx.toolsUsed.map((tool, index) => (
											<motion.span
												key={index}
												initial={{ opacity: 0, scale: 0.9 }}
												whileInView={{ opacity: 1, scale: 1 }}
												viewport={{ once: true }}
												transition={{ duration: 0.3, delay: index * 0.05 }}
												className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-500/20 transition-colors"
											>
												{tool}
											</motion.span>
										))}
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Challenges & Solutions */}
			{workEx.challenges && workEx.challenges.length > 0 && (
				<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-display font-medium mb-8">
								Challenges & Solutions
							</h2>
							<div className="space-y-6">
								{workEx.challenges.map((challenge, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="p-6 rounded-lg bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20"
									>
										<h3 className="text-lg font-semibold text-orange-300 mb-3">
											{challenge.title}
										</h3>
										<p className="text-gray-300 leading-relaxed">
											<span className="text-green-400 font-semibold">Solution: </span>
											{challenge.solution}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Key Learnings */}
			{workEx.learnings && workEx.learnings.length > 0 && (
				<section className="relative px-6 md:px-16 mx-auto py-16 border-t border-white/5">
					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-display font-medium mb-8">
								Key Learnings
							</h2>
							<div className="space-y-4">
								{workEx.learnings.map((learning, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="flex gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
									>
										<span className="text-blue-400 text-xl flex-shrink-0 mt-1">💡</span>
										<p className="text-gray-300 leading-relaxed">
											{learning}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			{/* <section className="relative px-6 md:px-16 mx-auto py-20 border-t border-white/5">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center p-12 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
					>
						<h2 className="text-3xl font-display font-medium mb-4">
							Interested in working together?
						</h2>
						<p className="text-gray-400 mb-8 max-w-2xl mx-auto">
							I'm always open to discussing new projects, opportunities, and ideas.
						</p>
						<a
							href="/#contact"
							className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
						>
							Get in touch
							<span className="material-icons-outlined text-sm">
								arrow_forward
							</span>
						</a>
					</motion.div>
				</div>
			</section> */}

			<ContactFooter />
		</div>
	);
};

export default WorkExperienceDetailPage;
