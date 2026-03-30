import React, { useState, useEffect } from "react";
import { NAV_ITEMS } from "../constants-new";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
	const location = useLocation();
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-300 ${
				scrolled
					? "bg-black/80 backdrop-blur-lg"
					: "bg-transparent"
			}`}
		>
			<div className="flex items-center gap-10">
				<Link to="/" className="flex items-center gap-3 z-50 group">
					<div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
						<span className="text-purple-400 font-display font-bold text-sm">
							RD
						</span>
					</div>
					<span className="text-lg font-bold font-display tracking-tight text-white hidden md:block">
						rishab dugar
					</span>
				</Link>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex items-center gap-2"
				>
					<span className="relative flex h-2.5 w-2.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
					</span>
					<span className="text-sm text-gray-400 font-mono">
						Available for new projects
					</span>
				</motion.div>
			</div>

			<div className="flex items-center gap-8">
				<ul className="hidden md:flex gap-6 text-sm font-medium z-50 relative">
					{NAV_ITEMS.map((item) => {
						const isHash = item.href.startsWith("#");
						const isActive = location.pathname === item.href;
						const isCurrentlyHovered = hoveredItem === item.label;

						return (
							<li
								key={item.label}
								className="relative py-1"
								onMouseEnter={() => setHoveredItem(item.label)}
								onMouseLeave={() => setHoveredItem(null)}
							>
								{isHash ? (
									<a
										href={item.href}
										className="relative z-10 text-gray-400 hover:text-white transition-colors duration-300"
									>
										{item.label}
									</a>
								) : (
									<Link
										to={item.href}
										className={`relative z-10 transition-colors duration-300 ${
											isActive
												? "text-white"
												: "text-gray-400 hover:text-white"
										}`}
									>
										{item.label}
									</Link>
								)}

								{(isActive || isCurrentlyHovered) && (
									<motion.div
										layoutId="nav-underline"
										className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 z-20"
										transition={{
											type: "spring",
											stiffness: 380,
											damping: 30,
										}}
									/>
								)}
							</li>
						);
					})}
				</ul>

				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="px-4 py-2 text-sm font-medium border border-white/20 rounded-full hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
				>
					<span className="material-icons-outlined text-sm">
						description
					</span>
					<span className="hidden md:inline">Resume</span>
				</a>
			</div>
		</motion.nav>
	);
};

export default Navbar;
