import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import WorkGrid from '../components/WorkGrid';
import ContactFooter from '../components/ContactFooter';
import WorkExperiencePopup from '../components/WorkExperiencePopup';
import WorkCarouselSection from '@/components/sections/WorkCarouselSection';

const Home: React.FC = () => {
  const [activeWorkExId, setActiveWorkExId] = useState<string | null>(null);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedWork onShowReport={(id) => setActiveWorkExId(id)} />
      {/* <WorkGrid /> */}
      <WorkCarouselSection />
      <ContactFooter />

      <WorkExperiencePopup
        workExId={activeWorkExId}
        onClose={() => setActiveWorkExId(null)}
      />
    </>
  );
};

export default Home;