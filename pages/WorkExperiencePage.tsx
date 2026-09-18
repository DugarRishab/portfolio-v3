import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { workexData } from '@/utils/data';
import { WorkExperience } from '@/types';
import ContactFooter from '../components/ContactFooter';
import SectionBadge from '../components/shared/SectionBadge';
import WorkExperienceCard from '../components/cards/WorkExperienceCard';
import { SiteHead } from '../utils/seo';

const WorkExperiencePage: React.FC = () => {
	const workExperiences = workexData;

	return (
		<div className="pt-32 min-h-screen relative overflow-x-hidden">
			<SiteHead
				title="Work Experience — Rishab Dugar"
				description="Professional work experience of Rishab Dugar: full-stack engineering roles, projects delivered, and impact."
				path="/work-experience"
			/>
			{/* Header Section */}
			<section className="relative px-6 md:px-16 mx-auto mb-20">
				<div className="max-w-[1400px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<SectionBadge className="mb-4 justify-center">
							<span className="material-icons-outlined text-sm">
								work
							</span>
							work experience
						</SectionBadge>
						<h1 className="text-4xl md:text-6xl font-display font-medium mb-6">
							My Professional <span className="text-purple-400">Journey</span>
						</h1>
						<p className="text-gray-400 max-w-2xl mx-auto text-lg">
							A comprehensive overview of my career, from internships to full-time roles,
							showcasing the impact I've made across different organizations and domains.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Work Experience Grid */}
			<section className="relative px-6 md:px-16 mx-auto pb-20">
				<div className="max-w-[1400px] mx-auto">
					<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						>
							{workExperiences.map((experience, index) => (
								<motion.div
									key={experience.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
								>
									<WorkExperienceCard
										company={experience.company}
										role={experience.title}
										description={experience.overview}
										duration={`${experience.startDate} - ${experience.endDate}`}
										cardBg={experience.cardBg}
										id={experience.id}
									/>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

			<ContactFooter />
		</div>
	);
};

export default WorkExperiencePage;
