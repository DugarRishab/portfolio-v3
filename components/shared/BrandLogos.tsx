import React from "react";
import { motion } from "framer-motion";

const BRANDS = [
	{ name: "ThoughtBins", type: "SaaS" },
	{ name: "KronML", type: "AI Startup" },
	{ name: "Marrfa", type: "Real Estate" },
	{ name: "LightStudio", type: "Agency" },
	{ name: "GoodTimes", type: "E-commerce" },
];

const BrandLogos: React.FC = () => {
	return (
		<div className="py-16">
			<motion.p
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="text-center text-gray-500 text-sm font-mono uppercase tracking-wider mb-8"
			>
				Trusted by teams at
			</motion.p>
			<div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
				{BRANDS.map((brand, index) => (
					<motion.div
						key={brand.name}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="group flex flex-col items-center gap-1 px-6 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-default"
					>
						<span className="font-display font-bold text-lg text-gray-400 group-hover:text-white transition-colors">
							{brand.name}
						</span>
						<span className="text-xs text-gray-600 group-hover:text-purple-400 transition-colors">
							{brand.type}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default BrandLogos;
