import React from 'react';
import { motion } from 'framer-motion';
import Crystal from './Crystal';
import { CRYSTAL_IMAGES } from '../constants-new';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-32 overflow-hidden">

      {/* Decorative Line */}
      {/* <motion.div
        initial={{ height: 0 }}
        animate={{ height: '100vh' }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute left-6 md:left-16 top-0 w-[1px] bg-gradient-to-b from-transparent to-purple-500 opacity-100 hidden md:block"
      /> */}

      <div className="relative z-10 max-w-5xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-2 font-light"
        >
          Bridging the gap between
        </motion.p>

        <div className="flex flex-col md:block">
          <div className="flex items-center flex gap-x-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-9xl font-display font-medium leading-none tracking-tight"
            >
              Design
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '30%' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center gap-4 mx-8"
            >
              <div className="h-[1px] flex-grow bg-gray-700" />
              {/* <span className="text-6xl font-light text-white whitespace-nowrap">&</span> */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-7xl font-medium text-white mt-2"
            >
              &
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-6xl md:text-9xl font-display font-medium leading-none tracking-tight mt-2 md:mt-4 md:text-right"
          >
            Development
          </motion.h1>
        </div>
      </div>

      {/* Crystals */}
      <Crystal
        imageName="img1"
        customCss={{ top: '-7.5%', right: '-2%', width: '600px', opacity: 1, zIndex: 0 }}
        rotate={10}
      />


      

    </section>
  );
};

export default Hero;