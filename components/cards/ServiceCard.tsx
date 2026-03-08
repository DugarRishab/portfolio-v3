import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-8 rounded-2xl group hover:bg-white/5 transition-colors duration-300"
    >
      {/* Simple decorative icon/line at top of card */}
      <div className="w-full flex justify-center mb-6 opacity-50">
        <div className="h-[1px] w-12 bg-purple-500 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-purple-500 bg-black"></div>
        </div>
      </div>

      <h3 className="text-2xl font-display font-medium mb-4 text-center">{service.title}</h3>
      <p className="text-gray-400 text-center font-light leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
