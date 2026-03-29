import React from "react";

const BrandLogos: React.FC = () => {
	return (
		<div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
			<div className="flex items-center gap-1">
				<span className="font-display font-bold">ThoughtBins</span>
			</div>
			<span className="w-[5%] h-[2px] bg-gray-400"></span>
			<div className="flex items-center gap-1">
				<span className="font-display font-bold">GOOD TIMES</span>
			</div>
			<span className="w-[5%] h-[2px] bg-gray-400"></span>
			<div className="flex items-center gap-1">
				<span className="font-display font-bold">KronML</span>
			</div>
			<span className="w-[5%] h-[2px] bg-gray-400"></span>
			<div className="flex items-center gap-1">
				<span className="font-display font-bold text-lg">
					lightstudio
				</span>
			</div>
			<span className="w-[5%] h-[2px] bg-gray-400"></span>
			<div className="flex items-center gap-1">
				<span className="font-display font-bold">Marrfa</span>
			</div>
		</div>
	);
};

export default BrandLogos;
