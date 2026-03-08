import React from 'react';
import { motion } from 'framer-motion';
import Crystal from '../components/Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';
import ContactFooter from '../components/ContactFooter';
import AboutHeroSection from '../components/sections/AboutHeroSection';
import AboutSkillsSection from '../components/sections/AboutSkillsSection';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen relative">
      <Crystal
        src={CRYSTAL_IMAGES.img3}
        className="top-0 right-0 w-[500px] md:w-[800px] opacity-40 z-0 mix-blend-screen pointer-events-none"
        rotate={15}
      />

      {/* Header Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 md:px-16 mb-12 text-sm text-gray-400 font-display"
      >
        rishab dugar {'>'} <span className="text-white">about me</span>
      </motion.div>

      <AboutHeroSection />
      <AboutSkillsSection />
      <ContactFooter />
    </div>
  );
};

export default About;