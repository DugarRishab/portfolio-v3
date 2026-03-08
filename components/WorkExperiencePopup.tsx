/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkExperience } from '../types';
import { getWorkExperienceById } from '../utils/workexData';

interface WorkExperiencePopupProps {
	workExId: string | null;
	onClose: () => void;
}

const WorkExperiencePopup: React.FC<WorkExperiencePopupProps> = ({ workExId, onClose }) => {
	const [workEx, setWorkEx] = useState<WorkExperience | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!workExId) return;

		const loadContent = async () => {
			setLoading(true);
			try {
				const data = await getWorkExperienceById(workExId);
				setWorkEx(data || null);
			} catch (error) {
				console.error('Error loading work experience:', error);
				setWorkEx(null);
			} finally {
				setLoading(false);
			}
		};

		loadContent();
	}, [workExId]);

	return (
		<AnimatePresence>
			{workExId && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						onClick={(e) => e.stopPropagation()}
						className="bg-[#0a0a0a] border border-white/10 w-full max-w-7xl max-h-[90vh] overflow-y-auto lg:overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar"
					>
						{/* Header */}
						<div className="sticky top-0 z-10 flex items-center justify-between p-2 px-8 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
							<span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Work Experience Report</span>
							<button
								onClick={onClose}
								className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
							>
								<span className="material-icons-outlined">close</span>
							</button>
						</div>

						{/* Content */}
						<div className="p-6 md:p-8 lg:p-12 max-w-none">
							{loading ? (
								<div className="flex items-center justify-center py-20">
									<div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
								</div>
							) : workEx ? (
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
									{/* Left Column */}
									<div className="space-y-8">
										<div>
											<h2 className="text-3xl lg:text-4xl font-display font-medium mb-2">{workEx.title}</h2>
											<p className="text-gray-400 text-base lg:text-lg">{workEx.company} • {workEx.startDate} - {workEx.endDate}</p>
										</div>

										<div>
											<h3 className="text-xl lg:text-2xl font-display font-medium mb-4">Overview</h3>
											<p className="text-gray-300 leading-relaxed text-sm lg:text-base">{workEx.overview}</p>
										</div>

										<div>
											<h3 className="text-xl lg:text-2xl font-display font-medium mb-4">Key Responsibilities</h3>
											<ul className="space-y-3">
												{workEx.responsibilities.map((resp, idx) => (
													<li key={idx} className="text-gray-300 text-sm lg:text-base">
														<span className="font-semibold text-white">{resp.title}:</span> {resp.description}
													</li>
												))}
											</ul>
										</div>
									</div>

									{/* Right Column */}
									<div className="space-y-8">
										<div>
											<h3 className="text-xl lg:text-2xl font-display font-medium mb-4">Technologies Used</h3>
											<div className="flex flex-wrap gap-2">
												{workEx.technologies.map((tech, idx) => (
													<span key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs lg:text-sm text-purple-200">
														{tech}
													</span>
												))}
											</div>
										</div>

										<div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6 lg:p-8">
											<h3 className="text-xl lg:text-2xl font-display font-medium mb-4">Impact</h3>
											<blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 text-sm lg:text-base">
												<p className="mb-3">"{workEx.impact}"</p>
												<footer className="text-gray-400 not-italic">— {workEx.impactAuthor}</footer>
											</blockquote>
										</div>

										{/* {workEx.image && (
											<div className="rounded-xl overflow-hidden border border-white/10">
												<img src={workEx.image} alt={workEx.title} className="w-full h-auto object-cover" />
											</div>
										)} */}
									</div>
								</div>
							) : (
								<div className="text-center py-20">
									<p className="text-gray-400">Could not load work experience details.</p>
								</div>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default WorkExperiencePopup;
