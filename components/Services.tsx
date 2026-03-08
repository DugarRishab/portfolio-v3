import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants-new';
import Crystal from './Crystal';
import ServiceCard from './cards/ServiceCard';

const Services: React.FC = () => {
  return (
    <section className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-32 mb-20"
      >
        <h2 className="text-2xl md:text-4xl font-display text-purple-200/90 max-w-3xl mx-auto leading-relaxed">
          transforming ideas into reality through <br/>
          <span className="text-white">end-to-end development</span>
        </h2>
      </motion.div>
      <Crystal
        imageName="img4"
        customCss={{ bottom: '20%', right: '-9.8%', width: '250px', opacity: 1 }}
        rotate={0}
      />
      
    </section>
  );
};

export default Services;