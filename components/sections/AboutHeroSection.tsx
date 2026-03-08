import React from 'react';
import { motion } from 'framer-motion';
import AboutInfoCard from '../cards/AboutInfoCard';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="px-6 md:px-16 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

      {/* Left: Profile & Intro */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 overflow-hidden mb-8 relative mx-auto lg:mx-0"
        >
          {/* Placeholder for Profile Picture */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            👨‍💻
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-display font-medium mb-2 text-center lg:text-left"
        >
          Hey there, I am <br />
          <span className="text-purple-400">Rishab Dugar</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg text-center lg:text-left font-light"
        >
          Student <span className="text-purple-500 mx-2">⚡</span> Software Developer
        </motion.p>
      </div>

      {/* Right: Floating Cards */}
      <div className="relative h-[400px] w-full hidden md:block">
        {/* Card 1: Currently Working */}
        <AboutInfoCard
          label="Currently Working"
          value={<div className="text-xl font-bold text-cyan-400 mb-1">Marrfa</div>}
          borderColor="border-l-cyan-400"
          linkHref="#"
          linkText="marrfa.com"
          delay={0.4}
          className="absolute top-0 left-10 w-64"
        />

        {/* Card 2: Mission */}
        <AboutInfoCard
          label="Mission Statement"
          value={
            <div className="text-lg leading-snug">
              I love helping startups <span className="text-purple-400 font-semibold">build systems</span> that sell
            </div>
          }
          borderColor="border-l-purple-500"
          delay={0.5}
          className="absolute top-28 left-48 w-72 z-10 bg-[#0F0F11]/80"
        />

        {/* Card 3: Freelance */}
        <AboutInfoCard
          label="Freelance Projects"
          value={<div className="text-2xl font-bold">12+ <span className="text-sm font-normal text-gray-400">projects</span></div>}
          borderColor="border-l-pink-500"
          delay={0.6}
          className="absolute bottom-10 left-0 w-48"
        />

        {/* Card 4: Experience */}
        <AboutInfoCard
          label="Work Experience"
          value={<div className="text-2xl font-bold">2 <span className="text-sm font-normal text-gray-400">years</span></div>}
          borderColor="border-l-orange-400"
          delay={0.7}
          className="absolute bottom-0 left-60 w-48"
        />
      </div>

      {/* Mobile View for cards (stacked) */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="glass-card p-5 rounded-xl border-l-4 border-l-cyan-400">
          <div className="text-xs text-gray-400">Currently Working</div>
          <div className="text-xl font-bold text-cyan-400">Marrfa</div>
        </div>
        <div className="glass-card p-5 rounded-xl border-l-4 border-l-purple-500">
          <div className="text-xs text-gray-400 mb-1">Mission Statement</div>
          <div>I love helping startups build systems that sell</div>
        </div>
        <div className="flex gap-4">
          <div className="glass-card p-5 rounded-xl border-l-4 border-l-pink-500 flex-1">
            <div className="text-xs text-gray-400">Freelance</div>
            <div className="text-xl font-bold">12+</div>
          </div>
          <div className="glass-card p-5 rounded-xl border-l-4 border-l-orange-400 flex-1">
            <div className="text-xs text-gray-400">Experience</div>
            <div className="text-xl font-bold">2 yrs</div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutHeroSection;
