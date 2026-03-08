import React from 'react';
import { motion } from 'framer-motion';

interface AboutInfoCardProps {
  label: string;
  value: React.ReactNode;
  borderColor: string;
  linkHref?: string;
  linkText?: string;
  delay?: number;
  className?: string;
}

const AboutInfoCard: React.FC<AboutInfoCardProps> = ({
  label,
  value,
  borderColor,
  linkHref,
  linkText,
  delay = 0.4,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ delay }}
      className={`glass-card p-6 rounded-2xl border-l-4 ${borderColor} ${className}`}
    >
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div>{value}</div>
      {linkHref && linkText && (
        <a href={linkHref} className="text-xs text-gray-500 flex items-center gap-1 hover:text-white">
          {linkText} <span className="material-icons-outlined text-[10px]">north_east</span>
        </a>
      )}
    </motion.div>
  );
};

export default AboutInfoCard;
