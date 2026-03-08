import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CRYSTAL_IMAGES } from '../constants-new';

interface CrystalProps {
  imageName?: keyof typeof CRYSTAL_IMAGES;
  src?: string;
  customCss?: React.CSSProperties;
  className?: string;
  scale?: number;
  rotate?: number;
}

const Crystal: React.FC<CrystalProps> = ({
  imageName,
  src,
  customCss,
  className,
  scale = 1,
  rotate = 0
}) => {
  const imagePath = src || (imageName ? `/assets/${CRYSTAL_IMAGES[imageName]}` : '');

  return (
    <motion.div
      style={{
        ...customCss,
        scale,
        rotate
      }}
      className={`absolute pointer-events-none z-0 ${className || ''}`}
    >
      {imagePath && (
        <img
          src={imagePath}
          alt="Decorative Crystal"
          className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]"
        />
      )}
    </motion.div>
  );
};

export default Crystal;