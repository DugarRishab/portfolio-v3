import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TOCItem {
	id: string;
	label: string;
	icon?: string;
}

interface TableOfContentsProps {
	items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-20% 0px -70% 0px" },
		);

		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [items]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<motion.nav
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.5 }}
			className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
		>
			<div className="glass-card rounded-xl p-4 border border-white/10 max-w-[200px]">
				<p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">
					On this page
				</p>
				<ul className="space-y-2">
					{items.map((item, index) => (
						<li key={item.id}>
							<motion.button
								initial={{ opacity: 0, x: 10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 + index * 0.1 }}
								onClick={() => scrollToSection(item.id)}
								className={`flex items-center gap-2 text-sm transition-all duration-300 w-full text-left ${
									activeId === item.id
										? "text-purple-400"
										: "text-gray-500 hover:text-white"
								}`}
							>
								<span
									className={`w-1.5 h-1.5 rounded-full transition-all ${
										activeId === item.id
											? "bg-purple-500 scale-125"
											: "bg-gray-600"
									}`}
								/>
								{item.label}
							</motion.button>
						</li>
					))}
				</ul>
			</div>
		</motion.nav>
	);
};

export default TableOfContents;
