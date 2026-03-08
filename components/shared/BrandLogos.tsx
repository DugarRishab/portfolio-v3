import React from 'react';

const BrandLogos: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <span className="font-display font-bold">GOOD TIMES</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-icons-outlined text-3xl">bolt</span>
        <span className="font-display font-bold">KronML</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-display font-bold text-lg">lightstudio</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-icons-outlined text-2xl">architecture</span>
        <span className="font-display font-bold">Marrfa</span>
      </div>
    </div>
  );
};

export default BrandLogos;
