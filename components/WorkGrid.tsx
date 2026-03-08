import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';

const WorkGrid: React.FC = () => {
  return (
    <section className="relative px-6 md:px-16 pb-20 max-w-7xl mx-auto">
      <Crystal
        imageName="img2"
        customCss={{ top: '20%', right: '-140px', width: '500px', opacity: 1, zIndex: 0 }}
        
      />
      <Crystal
        imageName="img3"
        customCss={{ bottom: 0, left: '-125px', width: '600px', opacity: 1, zIndex: 0 }}
        rotate={0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] md:aspect-square bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="aspect-[4/5] md:aspect-square bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer"
        />
      </div>
    </section>
  );
};

export default WorkGrid;