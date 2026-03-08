import React from 'react';

interface TechIconProps {
  className?: string;
}

export const NodeIcon: React.FC<TechIconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 32 32" className={`${className} fill-current`}>
    <path d="M16 2 L2 10 L2 24 L16 32 L30 24 L30 10 L16 2 Z M16 28 L6 22 L6 12 L16 18 L26 12 L26 22 L16 28 Z" opacity="0.8" />
  </svg>
);

export const ReactIcon: React.FC<TechIconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={`${className} fill-current`}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const MongoIcon: React.FC<TechIconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-green-500`}>
    <path d="M12 0c0 0-2.3 3.6-2.3 8.3 0 1.9.4 4.5 2.3 8.3 1.9-3.8 2.3-6.4 2.3-8.3C14.3 3.6 12 0 12 0z" />
  </svg>
);

export const CloudIcon: React.FC<TechIconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-blue-500`}>
    <path d="M18 10h-1.2c-.3-3.6-3.3-6.5-7-6.5-3.3 0-6.1 2.3-6.8 5.4C1.3 9.4 0 11.2 0 13.2 0 16.4 2.6 19 5.8 19h12.4c3.2 0 5.8-2.6 5.8-5.8 0-3.1-2.4-5.6-5.4-5.8z" />
  </svg>
);

export const AWSIcon: React.FC<TechIconProps> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M16.9 14.6c-.6 0-1.2-.1-1.7-.2-.5.5-.8 1.1-.8 1.8 0 1.2 1 2.2 2.2 2.2 1.2 0 2.2-1 2.2-2.2v-3.8c-.5 1.4-1.1 2.2-1.9 2.2zm-4.3 1.6c-.5.3-1.1.4-1.7.4-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.4 0 2.7.7 3.6 1.7.3-.5.5-1.1.5-1.7 0-.4-.1-.8-.2-1.2-.8-1.2-2.3-2.1-3.9-2.1-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3c1.9 0 3.6-1 4.5-2.5-.5-.4-.9-.8-1.3-1.3z" />
  </svg>
);
