import React from 'react';
import { motion } from 'framer-motion';

interface ResearchArea {
  title: string;
  description: string;
  icon: string;
}

const RESEARCH_AREAS: ResearchArea[] = [
  {
    title: 'AI Systems & Orchestration',
    description: 'Exploring practical applications of LLMs in production workflows. Building reliable systems that integrate AI agents with existing infrastructure.',
    icon: 'psychology',
  },
  {
    title: 'Distributed Systems',
    description: 'Building fault-tolerant automation pipelines. Understanding how to design systems that handle failures gracefully and scale horizontally.',
    icon: 'account_tree',
  },
  {
    title: 'System Design',
    description: 'Architecture patterns for scalable automation and integration systems. From monoliths to microservices—choosing the right approach for the problem.',
    icon: 'architecture',
  },
];

const ResearchInterests: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-16 bg-gradient-to-b from-transparent to-purple-950/10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-medium mb-4 text-center"
      >
        Research <span className="text-purple-400">Interests</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
      >
        Areas I am actively exploring and learning about. Not claiming expertise—just genuine curiosity.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {RESEARCH_AREAS.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-6 rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <span className="material-icons-outlined text-purple-400 text-2xl">{area.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ResearchInterests;
