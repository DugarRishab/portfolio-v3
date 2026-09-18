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
import { SiteHead, SITE_URL } from "../utils/seo";

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Rishab Dugar",
	url: SITE_URL,
	jobTitle: "Full-Stack Engineer & Designer",
	description:
		"Full-stack engineer and designer building scalable systems, AI-powered tools, and beautiful digital experiences.",
	knowsAbout: [
		"Full-Stack Development",
		"AI-Powered Tools",
		"Workflow Automation",
		"Lead Generation Systems",
		"Backend & API Systems",
		"Product Design",
	],
};

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Rishab Dugar — Portfolio",
	url: SITE_URL,
	author: { "@type": "Person", name: "Rishab Dugar" },
};

const Home: React.FC = () => {
	const [activeWorkExId, setActiveWorkExId] = useState<string | null>(null);

	return (
		<div className="relative">
			<SiteHead
				title="Rishab Dugar — Full-Stack Engineer & Designer"
				description="Full-stack engineer and designer building scalable systems, AI-powered tools, workflow automation, and beautiful digital experiences. View services, projects, and case studies."
				path="/"
				jsonLd={[personSchema, websiteSchema]}
			/>
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