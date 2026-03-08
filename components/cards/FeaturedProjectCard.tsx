import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from '../../types';
import { loadWorkExperience } from '../../utils/workexData';

interface FeaturedProjectCardProps {
  onShowReport?: (id: string) => void;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ onShowReport }) => {
  const [featured, setFeatured] = useState<WorkExperience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadWorkExperience();
      const featuredItem = data.find(item => item.featured);
      setFeatured(featuredItem || null);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-3xl overflow-hidden border border-white/10 relative z-10 h-96 animate-pulse"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass-card rounded-3xl overflow-hidden border border-white/10 relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Project Info */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-gray-400 text-sm mb-2">{featured.title}</span>
          <div className="text-xs text-gray-500 mb-6">{featured.company}</div>

          <h3 className="text-3xl font-display font-medium mb-6">{featured.title}</h3>

          <p className="text-gray-400 mb-8 leading-relaxed">
            {featured.overview}
          </p>

          <button
            onClick={() => onShowReport?.(featured.id)}
            className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 self-start hover:border-white transition-colors"
          >
            read full report <span className="material-icons-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Project Image */}
        <div className="bg-[#1A1A1D] p-6 flex items-center justify-center relative overflow-hidden">
          {/* Abstract UI Mockup */}
          <div className="w-full h-full min-h-[300px] bg-[#E0E0E0] rounded-xl shadow-2xl relative overflow-hidden p-4">
            {/* Mock Browser/App Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="flex-grow"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
            {/* Mock Content */}
            <div className="w-full h-24 bg-[#6366F1] rounded-lg mb-4 flex items-center justify-center text-white/50 text-xs">Data Interactions & Insights</div>
            <div className="w-full space-y-2">
              <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-2 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-2 w-full bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 blur-[100px] opacity-20 pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
