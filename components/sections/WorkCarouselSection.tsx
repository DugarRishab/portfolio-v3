import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from '../../types';
import { loadWorkExperience } from '../../utils/workexData';
import WorkExperienceCard from '../cards/WorkExperienceCard';

const WorkCarouselSection: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadWorkExperience();
      setWorkExperience(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Infinite Carousel Logic
  // We duplicate the array to create a seamless loop effect visually
  const carouselItems = [...workExperience];

  useEffect(() => {
    if (workExperience.length === 0) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % workExperience.length);
    }, 10000); // Moves every 10 seconds
    return () => clearInterval(timer);
  }, [workExperience.length]);

  return (
    <section className="relative px-6 md:px-16 mb-40 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* Carousel Container */}
        <div className="flex gap-6 md:gap-8 w-full overflow-x-hidden">
          <motion.div
            className="flex flex-row flex-wrap justify-center items-center gap-6 md:gap-8 w-full"
            // animate={{
            //   x: `-${carouselIndex * 400}px` // Assumes card width + gap is approx 340px
            // }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {carouselItems.map((item, index) => (
              <WorkExperienceCard
                key={`${item.id}-${index}`}
                company={item.company}
                role={item.title}
                description={item.overview}
                duration={`${item.startDate} - ${item.endDate}`}
                cardBg={item.cardBg}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkCarouselSection;
