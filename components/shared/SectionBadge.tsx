import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SectionBadgeProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({
  children,
  className = '',
  ...motionProps
}) => {
  return (
    <motion.div
      {...motionProps}
      className={`inline-flex items-center gap-2 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SectionBadge;
