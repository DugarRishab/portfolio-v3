import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CRYSTAL_IMAGES } from '../constants-new';

interface CrystalProps {
	imageName?: keyof typeof CRYSTAL_IMAGES;
	src?: string;
	customCss?: React.CSSProperties;
	className?: string;
	scale?: number;
	rotate?: number;
	useScaling?: boolean;
}

const Crystal: React.FC<CrystalProps> = ({
	imageName,
	src,
	customCss,
	className,
	scale = 1,
	rotate = 0,
	useScaling = false,
}) => {
	const imagePath =
		src || (imageName ? `/assets/${CRYSTAL_IMAGES[imageName]}` : "");

	const scaledStyle = useScaling
		? {
				...customCss,
				width: customCss?.width
					? `calc(${customCss.width} * var(--scale-factor))`
					: customCss?.width,
				height: customCss?.height
					? `calc(${customCss.height} * var(--scale-factor))`
					: customCss?.height,
				left:
					customCss?.left !== undefined
						? `calc(${customCss.left} * var(--scale-factor))`
						: customCss?.left,
				right:
					customCss?.right !== undefined
						? `calc(${customCss.right} * var(--scale-factor))`
						: customCss?.right,
				top:
					customCss?.top !== undefined
						? `calc(${customCss.top} * var(--scale-factor))`
						: customCss?.top,
				bottom:
					customCss?.bottom !== undefined
						? `calc(${customCss.bottom} * var(--scale-factor))`
						: customCss?.bottom,
			}
		: customCss;

	const finalStyle = {
		...scaledStyle,
		scale,
		rotate,
	};


	return (
		<motion.div
			style={finalStyle}
			className={`absolute pointer-events-none z-0 ${className || ""}`}
		>
			{imagePath && (
				<img
					src={imagePath}
					alt="Decorative Crystal"
					className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]"
				/>
			)}
		</motion.div>
	);
};

export default Crystal;