import React from 'react';
import { motion } from 'framer-motion';
import { NodeIcon, ReactIcon, MongoIcon, CloudIcon, AWSIcon, DockerIcon, PythonIcon, DatabaseIcon } from '../shared/TechIcons';

const AboutSkillsSection: React.FC = () => {
  return (
    <section className="px-6 md:px-16 pb-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-medium text-center mb-16 text-purple-200"
      >
        Skills
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
        <motion.div whileHover={{ scale: 1.2, color: "#68A063" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <NodeIcon />
          <span className="text-xs uppercase tracking-widest mt-2">Node.js</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#61DAFB" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <ReactIcon />
          <span className="text-xs uppercase tracking-widest mt-2">React</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#3776AB" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <PythonIcon />
          <span className="text-xs uppercase tracking-widest mt-2">Python</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#47A248" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <MongoIcon />
          <span className="text-xs uppercase tracking-widest mt-2">MongoDB</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#2496ED" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <DockerIcon />
          <span className="text-xs uppercase tracking-widest mt-2">Docker</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#4285F4" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <CloudIcon />
          <span className="text-xs uppercase tracking-widest mt-2">Google Cloud</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#FF9900" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <AWSIcon />
          <span className="text-xs uppercase tracking-widest mt-2">AWS</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, color: "#A8B9CC" }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors">
          <DatabaseIcon />
          <span className="text-xs uppercase tracking-widest mt-2">PostgreSQL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSkillsSection;
