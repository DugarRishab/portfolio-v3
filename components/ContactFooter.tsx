import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';

const ContactFooter: React.FC = () => {
  return (
    <footer className="relative pt-32 pb-10 px-6 md:px-16 overflow-hidden" id="contact">

      
      <Crystal
              imageName="img6"
              customCss={{ bottom: '0%', right: '-5%', width: '300px', opacity: 1 }}
        rotate={0}
        scale={2}
            />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-medium mb-4"
        >
          Have an awesome idea?
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-medium text-purple-400 mb-16"
        >
          Let's Discuss
        </motion.h2>

        {/* Email Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">rishab dugar</span>
          </div>

          <div className="flex flex-col items-end text-right text-xs md:text-sm text-gray-400">
            <a href="mailto:rishabdugar.work@gmail.com" className="hover:text-white transition-colors">rishabdugar.work@gmail.com</a>
            <a href="tel:+918696490950" className="hover:text-white transition-colors">+91 8696490950</a>
          </div>
        </motion.div>

        <div className="mt-20 text-xs text-gray-500 border-t border-gray-900 pt-8">
          &copy; rishabdugar in 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;