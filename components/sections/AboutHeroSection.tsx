import React from 'react';
import { motion } from 'framer-motion';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="px-6 md:px-16 mb-20 lg:mb-28 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
            >
              Rishab
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600">
                Dugar
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                AI Systems Engineer
              </p>
              <div className="flex items-center gap-3 mt-2 text-gray-500 font-mono text-sm">
                <span>B.Tech Electrical Engineering</span>
                <span className="text-gray-700">|</span>
                <span>Building at ThoughtBins</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              I design systems that bridge electrical engineering fundamentals with modern software.
              From LLM orchestration to workflow automation, I build infrastructure that runs reliably in production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
              >
                <span>Get in touch</span>
                <span className="material-icons-outlined text-lg">arrow_forward</span>
              </a>
              <a
                href="/work-experience"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg font-medium transition-colors"
              >
                <span>View experience</span>
              </a>
            </motion.div>
          </div>
          {/* Right: Bento grid stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 content-start">
            {/* Current role - full width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="col-span-2 glass-card rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Current Role</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-2xl font-semibold text-white mb-1">ThoughtBins Technologies</div>
              <div className="text-sm text-gray-400">Full Stack Engineer — Automation & AI Systems</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['n8n', 'LangChain', 'Node.js', 'Docker'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="glass-card rounded-2xl p-5 border border-white/5 hover:border-cyan-500/20 transition-colors"
            >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">Building</span>
              <div className="text-3xl font-bold text-white">3+</div>
              <div className="text-sm text-gray-400">years coding</div>
            </motion.div>

            {/* Client work */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="glass-card rounded-2xl p-5 border border-white/5 hover:border-pink-500/20 transition-colors"
            >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">Deliverables</span>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-gray-400">client projects</div>
            </motion.div>

            {/* Focus areas - full width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="col-span-2 glass-card rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-colors"
            >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-3">Focus Areas</span>
              <div className="flex flex-wrap gap-2">
                {['AI Automation', 'System Design', 'Backend Infrastructure', 'LLM Orchestration'].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-gray-300 text-xs border border-white/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
