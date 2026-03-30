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

  return null;
};

export default WorkCarouselSection;
