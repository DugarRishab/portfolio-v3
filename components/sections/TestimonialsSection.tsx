import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types";
import SectionBadge from "../shared/SectionBadge";
import TestimonialCard from "../cards/TestimonialCard";

const TestimonialCarouselIndicator: React.FC<{
	total: number;
	current: number;
	onSelect: (index: number) => void;
}> = ({ total, current, onSelect }) => {
	return (
		<div className="flex gap-2 justify-center mt-8">
			{Array.from({ length: total }).map((_, i) => (
				<button
					key={i}
					onClick={() => onSelect(i)}
					className={`h-2 rounded-full transition-all duration-300 ${
						i === current
							? "w-8 bg-purple-500"
							: "w-2 bg-white/20 hover:bg-white/40"
					}`}
					aria-label={`Go to testimonial ${i + 1}`}
				/>
			))}
		</div>
	);
};

const TestimonialsSection: React.FC = () => {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
	const isAutoScrolling = useRef(true);

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

	const scrollToIndex = useCallback(
		(index: number) => {
			if (scrollRef.current && testimonials.length > 0) {
				const cardWidth = 350;
				const gap = 24;
				const scrollPosition = index * (cardWidth + gap);
				scrollRef.current.scrollTo({
					left: scrollPosition,
					behavior: "smooth",
				});
				setCurrentIndex(index);
			}
		},
		[testimonials.length],
	);

	useEffect(() => {
		if (testimonials.length === 0 || !isAutoScrolling.current) return;

		const startAutoScroll = () => {
			autoScrollTimer.current = setInterval(() => {
				setCurrentIndex((prev) => {
					const nextIndex = (prev + 1) % testimonials.length;
					scrollToIndex(nextIndex);
					return nextIndex;
				});
			}, 5000);
		};

		startAutoScroll();

		return () => {
			if (autoScrollTimer.current) {
				clearInterval(autoScrollTimer.current);
			}
		};
	}, [testimonials.length, scrollToIndex]);

	const scroll = (direction: "left" | "right") => {
		isAutoScrolling.current = false;
		if (autoScrollTimer.current) {
			clearInterval(autoScrollTimer.current);
		}

		if (scrollRef.current) {
			const scrollAmount = 374;
			const newScrollLeft =
				scrollRef.current.scrollLeft +
				(direction === "left" ? -scrollAmount : scrollAmount);
			const cardWidth = 350;
			const gap = 24;
			const cardTotal = cardWidth + gap;
			const newIndex = Math.round(newScrollLeft / cardTotal);

			scrollToIndex(
				Math.max(0, Math.min(newIndex, testimonials.length - 1)),
			);
		}
	};

	const goToTestimonial = (index: number) => {
		isAutoScrolling.current = false;
		if (autoScrollTimer.current) {
			clearInterval(autoScrollTimer.current);
		}
		scrollToIndex(index);
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
		<section className="relative py-20 px-6 md:px-16 w-full mx-auto">
			<div className="max-w-[1400px] mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
				>
					<div>
						<SectionBadge className="mb-4">
							<span className="material-icons-outlined text-sm">
								format_quote
							</span>
							testimonials
						</SectionBadge>
						<h2 className="text-3xl md:text-5xl font-display font-medium">
							What People{" "}
							<span className="text-purple-400">Say</span>
						</h2>
					</div>

					<div className="flex gap-2 mt-6 md:mt-0">
						<button
							onClick={() => scroll("left")}
							className="p-3 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
							aria-label="Scroll testimonials left"
						>
							<span className="material-icons-outlined text-sm">
								arrow_back
							</span>
						</button>
						<button
							onClick={() => scroll("right")}
							className="p-3 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
							aria-label="Scroll testimonials right"
						>
							<span className="material-icons-outlined text-sm">
								arrow_forward
							</span>
						</button>
					</div>
				</motion.div>

				<div
					ref={scrollRef}
					className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] scroll-smooth"
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, margin: "0px" }}
							animate={{
								opacity: index === currentIndex ? 1 : 0.6,
								scale: index === currentIndex ? 1 : 0.95,
							}}
							transition={{ duration: 0.4, ease: "easeOut" }}
						>
							<TestimonialCard
								testimonial={testimonial}
								index={index}
							/>
						</motion.div>
					))}
				</div>

				{testimonials.length > 0 && (
					<TestimonialCarouselIndicator
						total={testimonials.length}
						current={currentIndex}
						onSelect={goToTestimonial}
					/>
				)}
			</div>
		</section>
	);
};

export default TestimonialsSection;
