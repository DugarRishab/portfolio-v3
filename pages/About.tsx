import React from 'react';
import { motion } from 'framer-motion';
import Crystal from '../components/Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';
import ContactFooter from '../components/ContactFooter';
import AboutHeroSection from '../components/sections/AboutHeroSection';
import AboutSkillsSection from '../components/sections/AboutSkillsSection';
import CareerTimeline from '../components/sections/CareerTimeline';
import ResearchInterests from '../components/sections/ResearchInterests';
import ServicesSnapshot from '../components/sections/ServicesSnapshot';
import Breadcrumb from '../components/shared/Breadcrumb';
import { SiteHead } from '../utils/seo';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen relative">
      <SiteHead
        title="About Rishab Dugar — Full-Stack Engineer & Designer"
        description="Learn about Rishab Dugar: full-stack engineer and designer, career timeline, skills, research interests, and the services offered."
        path="/about"
      />
      <Crystal
        src={CRYSTAL_IMAGES.img3}
        className="top-0 right-0 w-[500px] md:w-[800px] opacity-40 z-0 mix-blend-screen pointer-events-none"
        rotate={15}
      />

      {/* Header Breadcrumb */}
      <div className="px-6 md:px-16 mb-12">
        <Breadcrumb
          items={[
            { label: 'rishab dugar', href: '/' },
            { label: 'about me' },
          ]}
        />
      </div>

      <AboutHeroSection />
      <ServicesSnapshot />
      <CareerTimeline />
      <AboutSkillsSection />
      <ResearchInterests />
      <ContactFooter />
    </div>
  );
};

export default About;