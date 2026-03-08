import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PROJECTS } from '../../constants-new';
import ProjectCard from '../cards/ProjectCard';

const CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'software', label: 'Software Dev' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'ai', label: 'AI / ML' },
];

const WorkProjectsGridSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section className="px-6 md:px-16 pb-20 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-gray-800 pb-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-medium">
          Selected Projects
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default WorkProjectsGridSection;
