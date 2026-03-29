import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
	testimonial: Testimonial;
	index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<span
				key={i}
				className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
			>
				★
			</span>
		));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1 }}
			className="glass-card rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors duration-300 min-w-[320px] max-w-[400px] flex-shrink-0"
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-medium">
						{testimonial.name.charAt(0)}
					</div>
					<div>
						<h4 className="font-medium text-white">{testimonial.name}</h4>
						{testimonial.tagline && (
							<p className="text-xs text-gray-500">{testimonial.tagline}</p>
						)}
					</div>
				</div>
				{testimonial.logo && (
					<img
						src={testimonial.logo}
						alt="Platform"
						className="w-6 h-6 object-contain opacity-60"
					/>
				)}
			</div>

			<div className="flex items-center gap-1 mb-3">
				{renderStars(testimonial.rating)}
			</div>

			<p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
				{testimonial.desc}
			</p>

			<div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
				<span className="uppercase">{testimonial.cc}</span>
				<span>•</span>
				<span>{testimonial.country}</span>
			</div>
		</motion.div>
	);
};

export default TestimonialCard;
