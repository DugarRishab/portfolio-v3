import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Service {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  slug: string;
}

const SERVICES: Service[] = [
  {
    title: 'AI-Powered Tools',
    tagline: 'Intelligent automation that thinks for you',
    description: 'Internal tools leveraging AI to automate decisions, generate content, classify data, and process information.',
    icon: 'smart_toy',
    slug: 'ai-powered-tools',
  },
  {
    title: 'Workflow Automation',
    tagline: 'Systems that run themselves',
    description: 'End-to-end automation pipelines connecting your tools, eliminating repetitive tasks, and keeping operations running 24/7.',
    icon: 'account_tree',
    slug: 'workflow-automation',
  },
  {
    title: 'Backend & API Systems',
    tagline: 'Scalable infrastructure that powers your products',
    description: 'Production-ready backend systems—APIs, databases, authentication, and third-party integrations.',
    icon: 'dns',
    slug: 'backend-api-systems',
  },
];

const ServicesSnapshot: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-medium mb-4 text-center"
      >
        What I <span className="text-purple-400">Build</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
      >
        Services for clients and employers. Systems designed to solve real problems.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
            onClick={() => navigate(`/services/${service.slug}`)}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
              <span className="material-icons-outlined text-purple-400 text-2xl">{service.icon}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
            <p className="text-purple-400 text-sm mb-3">{service.tagline}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all"
        >
          <span>View All Services</span>
          <span className="material-icons-outlined text-sm">arrow_forward</span>
        </button>
      </motion.div>
    </section>
  );
};

export default ServicesSnapshot;
