import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedWork from "../components/FeaturedWork";
import ContactFooter from "../components/ContactFooter";
import WorkExperiencePopup from "../components/WorkExperiencePopup";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TechStackSection from "@/components/shared/TechStackSection";

const Home: React.FC = () => {
	const [activeWorkExId, setActiveWorkExId] = useState<string | null>(null);

	return (
		<div className="relative">
			<Hero />
			<About />
			<Services />
			<TechStackSection />
			<FeaturedWork onShowReport={(id) => setActiveWorkExId(id)} />
			{/* <WorkGrid /> */}
			{/* <WorkCarouselSection /> */}
			{/* <ProjectsSection /> */}
			<TestimonialsSection />
			<ContactFooter />

			<WorkExperiencePopup
				workExId={activeWorkExId}
				onClose={() => setActiveWorkExId(null)}
			/>
		</div>
	);
};

export default Home;