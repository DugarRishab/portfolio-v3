import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import './app.css';
import "./styles/mouseAnimation.css";
import { useMouseAnimation } from "./hooks/useMouseAnimation";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import ProductVisualTest from "./pages/ProductVisualTest";
import ServiceDetail from "./pages/ServiceDetail";
import WorkExperiencePage from "./pages/WorkExperiencePage";
import WorkExperienceDetailPage from "./pages/WorkExperienceDetailPage";
import { caseStudiesData, servicesData, workexData } from "./utils/data";

const AppContent = () => {
	const location = useLocation();

	// Scroll to top on route change
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	// Initialize mouse animation
	useMouseAnimation();

	// Register service worker for PWA
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/service-worker.js').catch(() => {
					// Service worker registration failed, app will still work
				});
			});
		}
	}, []);

	return (
		<div className="bg-background text-white min-h-screen relative font-sans selection:bg-purple-500">
			<Navbar />
			<div id="circle" className="circle"></div>
			<div id="bg-circles" className="bg-circle"></div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export const routes: RouteRecord[] = [
	{
		path: '/',
		element: <AppContent />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'about', element: <About /> },
			{ path: 'work', element: <Work /> },
			{ path: 'work-experience', element: <WorkExperiencePage /> },
			{
				path: 'workex/:id',
				element: <WorkExperienceDetailPage />,
				getStaticPaths: () => workexData.map((w) => `workex/${w.id}`),
			},
			{ path: 'case-studies', element: <CaseStudies /> },
			{
				path: 'case-studies/:id',
				element: <CaseStudyDetail />,
				getStaticPaths: () => caseStudiesData.map((s) => `case-studies/${s.id}`),
			},
			{ path: 'test-visuals', element: <ProductVisualTest /> },
			{
				path: 'services/:slug',
				element: <ServiceDetail />,
				getStaticPaths: () => servicesData.map((s) => `services/${s.slug}`),
			},
		],
	},
];
