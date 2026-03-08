import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants-new';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference text-white"
    >
      <Link to="/" className="text-xl font-bold font-display tracking-tight z-50">
        rishab dugar
      </Link>

      <ul className="flex gap-8 text-sm font-bold z-50 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none px-6 py-2 rounded-full md:p-0 relative">
        {NAV_ITEMS.map((item) => {
          const isHash = item.href.startsWith('#');
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
                  className="relative z-10 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="relative z-10 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )}

              <AnimatePresence>
                {(isActive || isCurrentlyHovered) && (
                  <motion.div
                    layoutId="nav-glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -inset-x-4 bg-[#A885EC] rounded-full -z-10 blur-[12px] opacity-30"
                  />
                )}
              </AnimatePresence>

              {(isActive || isCurrentlyHovered) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A885EC] z-20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default Navbar;