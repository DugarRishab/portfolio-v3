import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types";
import SectionBadge from "../shared/SectionBadge";
import TestimonialCard from "../cards/TestimonialCard";

const TestimonialsSection: React.FC = () => {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadTestimonials = async () => {
			try {
				const response = await fetch("/assets/data/testimonials.json");
				if (response.ok) {
					const data = await response.json();
					setTestimonials(data);
				}
			} catch (error) {
				console.error("Error loading testimonials:", error);
			} finally {
				setLoading(false);
			}
		};
		loadTestimonials();
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = 350;
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	if (loading) {
		return (
			<section className="relative py-20 px-6 md:px-16 w-full max-w-[2560px] mx-auto">
				<div className="flex gap-6 overflow-hidden">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="glass-card rounded-2xl h-48 min-w-[320px] animate-pulse"
						/>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="relative py-20 px-6 md:px-16 w-full max-w-[2560px] mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
			>
				<div>
					<SectionBadge className="mb-6">
						<span className="material-icons-outlined text-sm">
							format_quote
						</span>
						testimonials
					</SectionBadge>
					<h2 className="text-3xl md:text-5xl font-display font-medium">
						What People <span className="text-purple-400">Say</span>
					</h2>
				</div>

				<div className="flex gap-2 mt-6 md:mt-0">
					<button
						onClick={() => scroll("left")}
						className="p-3 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
					>
						<span className="material-icons-outlined text-sm">
							arrow_back
						</span>
					</button>
					<button
						onClick={() => scroll("right")}
						className="p-3 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
					>
						<span className="material-icons-outlined text-sm">
							arrow_forward
						</span>
					</button>
				</div>
			</motion.div>

			<div
				ref={scrollRef}
				className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none]"
			>
				{testimonials.map((testimonial, index) => (
					<TestimonialCard
						key={index}
						testimonial={testimonial}
						index={index}
					/>
				))}
			</div>
		</section>
	);
};

export default TestimonialsSection;
