import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import SectionBadge from './shared/SectionBadge';
import FeaturedProjectCard from './cards/FeaturedProjectCard';
import BrandLogos from './shared/BrandLogos';

interface FeaturedWorkProps {
  onShowReport?: (id: string) => void;
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onShowReport }) => {
  return (
    <section className="relative py-10 px-6 md:px-16 max-w-7xl mx-auto" id="work">
      {/* <Crystal
        imageName="img1"
        customCss={{ top: 0, left: '-160px', width: '600px', opacity: 0.6, zIndex: 0 }}
        rotate={45}
      /> */}
      <Crystal
        imageName="img5"
        customCss={{ top: '-10%', left: '-5%', width: '400px', opacity: 1, zIndex: 0 }}
        rotate={0}
        scale={1.5}
      />

      {/* Header for Work */}
      <div className="flex flex-col md:flex-row justify-end items-end mb-16 relative z-10">
        <div className="text-right">
          <SectionBadge
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4 justify-end ml-auto"
          >
            summary report
          </SectionBadge>
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white"
          >
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-lg ml-auto mb-6 text-lg"
          >
            1 year of Experience in a fast-paced Startup <br />
            2+ years of Freelancing experience developing software solutions for 8+ clients in 5+ countries
          </motion.p>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors"
          >
            View full work experience
            <span className="material-icons-outlined text-sm">arrow_forward</span>
          </motion.a>
        </div>
      </div>

      <FeaturedProjectCard onShowReport={onShowReport} />

      <BrandLogos />
    </section>
  );
};

export default FeaturedWork;