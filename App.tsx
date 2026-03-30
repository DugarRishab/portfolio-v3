import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './app.css';
import "./styles/mouseAnimation.css";
import { AnimatePresence } from 'framer-motion';
import { useMouseAnimation } from "./hooks/useMouseAnimation";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import ProductVisualTest from "./pages/ProductVisualTest";

// Wrapper to handle AnimatePresence if we wanted page transitions,
// but for now just routing.
const AppContent = () => {
	const location = useLocation();

	// Scroll to top on route change
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	// Initialize mouse animation
	useMouseAnimation();

	return (
		<div className="bg-background text-white min-h-screen relative font-sans selection:bg-purple-500">
			<Navbar />
			<div id="circle" className="circle"></div>
			<div id="bg-circles" className="bg-circle"></div>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/work" element={<Work />} />
					<Route path="/case-studies" element={<CaseStudies />} />
					<Route
						path="/case-studies/:id"
						element={<CaseStudyDetail />}
					/>
					<Route
						path="/test-visuals"
						element={<ProductVisualTest />}
					/>
				</Routes>
			</main>
		</div>
	);
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;