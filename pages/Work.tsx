import React from 'react';
import ContactFooter from '../components/ContactFooter';
import WorkHeaderSection from '../components/sections/WorkHeaderSection';
import WorkCarouselSection from '../components/sections/WorkCarouselSection';
import WorkProjectsGridSection from '../components/sections/WorkProjectsGridSection';

const Work: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen relative overflow-x-hidden">
      <WorkHeaderSection />
      <WorkCarouselSection />
      <WorkProjectsGridSection />
      <ContactFooter />
    </div>
  );
};

export default Work;