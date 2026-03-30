import React from "react";
import { motion, Variants } from "framer-motion";

// Stagger container for children animations
export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
	},
};

export const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: -30 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
	},
};

export const fadeInRight: Variants = {
	hidden: { opacity: 0, x: 30 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
	},
};

// Animated text reveal - character by character
interface AnimatedTextProps {
	text: string;
	className?: string;
	delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	text,
	className = "",
	delay = 0,
}) => {
	const words = text.split(" ");

	return (
		<motion.span className={className}>
			{words.map((word, wordIndex) => (
				<span key={wordIndex} className="inline-block">
					{word.split("").map((char, charIndex) => (
						<motion.span
							key={charIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: delay + wordIndex * 0.1 + charIndex * 0.03,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className="inline-block"
						>
							{char}
						</motion.span>
					))}
					<span className="inline-block">&nbsp;</span>
				</span>
			))}
		</motion.span>
	);
};

// Animated counter for stats
interface AnimatedCounterProps {
	value: string;
	className?: string;
	delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
	value,
	className = "",
	delay = 0,
}) => {
	const numericPart = value.replace(/[^0-9]/g, "");
	const suffix = value.replace(/[0-9]/g, "");

	return (
		<motion.span
			className={className}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.6,
				delay,
				type: "spring",
				stiffness: 100,
			}}
		>
			{numericPart}
			{suffix}
		</motion.span>
	);
};

// Magnetic button effect
interface MagneticButtonProps {
	children: React.ReactNode;
	className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
	children,
	className = "",
}) => {
	const [position, setPosition] = React.useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		setPosition({ x: x * 0.2, y: y * 0.2 });
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
	};

	return (
		<motion.div
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			animate={{ x: position.x, y: position.y }}
			transition={{ type: "spring", stiffness: 150, damping: 15 }}
		>
			{children}
		</motion.div>
	);
};

// Glowing border card
interface GlowCardProps {
	children: React.ReactNode;
	className?: string;
	glowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
	children,
	className = "",
	glowColor = "rgba(168, 85, 247, 0.3)",
}) => {
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<motion.div
			className={`relative overflow-hidden ${className}`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3 }}
		>
			{/* Glow effect */}
			<motion.div
				className="absolute pointer-events-none"
				style={{
					width: 300,
					height: 300,
					borderRadius: "50%",
					background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
					left: mousePosition.x - 150,
					top: mousePosition.y - 150,
				}}
				animate={{ opacity: isHovered ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			/>
			{children}
		</motion.div>
	);
};

// Animated line/divider
interface AnimatedLineProps {
	className?: string;
	delay?: number;
}

export const AnimatedLine: React.FC<AnimatedLineProps> = ({
	className = "",
	delay = 0,
}) => {
	return (
		<motion.div
			className={`h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent ${className}`}
			initial={{ scaleX: 0, opacity: 0 }}
			whileInView={{ scaleX: 1, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
		/>
	);
};

// Floating animation wrapper
interface FloatingElementProps {
	children: React.ReactNode;
	className?: string;
	duration?: number;
	distance?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
	children,
	className = "",
	duration = 4,
	distance = 10,
}) => {
	return (
		<motion.div
			className={className}
			animate={{
				y: [-distance, distance, -distance],
			}}
			transition={{
				duration,
				repeat: Infinity,
				ease: "easeInOut",
			}}
		>
			{children}
		</motion.div>
	);
};

// Reveal on scroll wrapper
interface RevealOnScrollProps {
	children: React.ReactNode;
	className?: string;
	direction?: "up" | "down" | "left" | "right";
	delay?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
	children,
	className = "",
	direction = "up",
	delay = 0,
}) => {
	const directionMap = {
		up: { y: 40, x: 0 },
		down: { y: -40, x: 0 },
		left: { x: 40, y: 0 },
		right: { x: -40, y: 0 },
	};

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, ...directionMap[direction] }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{
				duration: 0.7,
				delay,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
		>
			{children}
		</motion.div>
	);
};

// Parallax wrapper
interface ParallaxProps {
	children: React.ReactNode;
	className?: string;
	speed?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({
	children,
	className = "",
	speed = 0.5,
}) => {
	const [scrollY, setScrollY] = React.useState(0);

	React.useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.div
			className={className}
			style={{ y: scrollY * speed }}
		>
			{children}
		</motion.div>
	);
};
