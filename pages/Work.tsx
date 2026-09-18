import React from 'react';
import ContactFooter from '../components/ContactFooter';
import WorkHeaderSection from '../components/sections/WorkHeaderSection';
import WorkCarouselSection from '../components/sections/WorkCarouselSection';
import WorkProjectsGridSection from '../components/sections/WorkProjectsGridSection';
import { SiteHead } from '../utils/seo';

const Work: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen relative overflow-x-hidden">
      <SiteHead
        title="Work & Projects — Rishab Dugar"
        description="Selected projects and work by Rishab Dugar: full-stack applications, AI-powered tools, and scalable systems."
        path="/work"
      />
      <WorkHeaderSection />
      <WorkCarouselSection />
      <WorkProjectsGridSection />
      <ContactFooter />
    </div>
  );
};

export default Work;