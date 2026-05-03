import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  company: string;
  role: string;
  period: string;
  description: string;
  type: 'fulltime' | 'contract' | 'internship';
}

const EXPERIENCES: TimelineItem[] = [
  {
    company: 'ThoughtBins Technologies',
    role: 'Full Stack Engineer (Automation & AI Systems)',
    period: 'Aug 2025 - Present',
    description: 'Building automation and AI-driven workflow systems using n8n, LangChain, and custom backend services.',
    type: 'fulltime',
  },
  {
    company: 'Marrfa',
    role: 'Software Developer',
    period: 'Sept 2024 - Dec 2024',
    description: 'Built a full-stack investment management platform from scratch with role-based dashboards and AWS deployment.',
    type: 'contract',
  },
  {
    company: 'KronML Inc.',
    role: 'Software Developer Intern',
    period: 'Jun 2024 - Aug 2024',
    description: 'Optimized infrastructure for a production AI platform. Implemented caching, containerization, and scalable deployment.',
    type: 'internship',
  },
];

const typeColors = {
  fulltime: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  contract: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  internship: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const typeLabels = {
  fulltime: 'Full-time',
  contract: 'Contract',
  internship: 'Internship',
};

const CareerTimeline: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-medium mb-12 text-center"
      >
        Career <span className="text-purple-400">Path</span>
      </motion.h2>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-gray-700 to-transparent" />

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0a0a0a]" />

              <div className="glass-card p-5 md:p-6 rounded-xl border border-white/5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                    <p className="text-gray-400 text-sm">{exp.role}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeColors[exp.type]}`}>
                    {typeLabels[exp.type]}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 font-mono">{exp.period}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
