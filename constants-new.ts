import { NavItem, ServiceItem, ProjectItem } from './types';

export const NAV_ITEMS: NavItem[] = [
	// { label: "home", href: "/" },
	// { label: "work", href: "/work" },
	// { label: "case studies", href: "/case-studies" },
	// { label: "about", href: "/about" },
	// { label: "contact", href: "#contact" },
];

export const HERO_TEXT = {};

export const SERVICES: ServiceItem[] = [
	{
		title: "AI-Powered Tools",
		description:
			"Internal tools that use AI to automate decisions, generate content, or process data without manual intervention.",
	},
	{
		title: "Workflow Automation",
		description:
			"End-to-end pipelines that connect your systems, eliminate repetitive tasks, and keep operations running 24/7.",
	},
	{
		title: "Lead Generation Systems",
		description:
			"Automated outreach and data collection pipelines that find, qualify, and deliver leads to your sales team.",
	},
	{
		title: "Backend & API Systems",
		description:
			"Scalable APIs and data infrastructure that power your applications reliably in production.",
	},
];

export const CRYSTAL_IMAGES = {
	img1: "crystals/crystal1.png",
	img2: "crystals/crystal2.png",
	img3: "crystals/crystal3.png",
	img4: "crystals/crystal4.png",
	img5: "crystals/crystal5.png",
	img6: "crystals/crystal6.png",
};

export const SKILLS = [
	{ name: "Node.js", color: "#68A063" },
	{ name: "React", color: "#61DAFB" },
	{ name: "MongoDB", color: "#47A248" },
	{ name: "Google Cloud", color: "#4285F4" },
	{ name: "AWS", color: "#FF9900" },
	{ name: "TypeScript", color: "#3178C6" },
	{ name: "Next.js", color: "#FFFFFF" },
	{ name: "Tailwind", color: "#06B6D4" },
];

export const ALL_PROJECTS: ProjectItem[] = [
	{
		id: "1",
		title: "Real Estate Investment Platform",
		role: "Full Stack Developer",
		description:
			"Problem: Manual tracking of investor portfolios and property data across spreadsheets. Solution: Built a full-stack platform with role-based dashboards for admins and investors. Outcome: Centralized operations and reduced admin overhead by 60%.",
		category: "software",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
	{
		id: "2",
		title: "Multi-Tenant Automation System",
		role: "Backend Engineer",
		description:
			"Problem: Sales and HR teams running repetitive workflows manually. Solution: Designed stateful workflow orchestration with retry logic and failure recovery. Outcome: Automated 80% of repetitive tasks across multiple business domains.",
		category: "software",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
	{
		id: "3",
		title: "Customer Feedback Analyzer",
		role: "AI Engineer",
		description:
			"Problem: Support team manually categorizing thousands of customer messages. Solution: Built an NLP pipeline to classify sentiment and extract actionable insights. Outcome: 94% accuracy, reduced response time by 3x.",
		category: "ai",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
	{
		id: "4",
		title: "IoT Device Control Hub",
		role: "Systems Developer",
		description:
			"Problem: Fragmented control across multiple smart home protocols. Solution: Built a centralized hub that unifies device communication. Outcome: Single interface controlling 15+ device types.",
		category: "electrical",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
	{
		id: "5",
		title: "Crypto Wallet Interface",
		role: "Frontend Developer",
		description:
			"Problem: Complex crypto transactions intimidating for new users. Solution: Designed an intuitive wallet UI with guided flows. Outcome: 40% increase in successful first-time transactions.",
		category: "software",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
	{
		id: "6",
		title: "Security Camera AI",
		role: "AI Engineer",
		description:
			"Problem: Security staff monitoring multiple camera feeds manually. Solution: Built real-time object detection to flag suspicious activity. Outcome: Reduced false alarms by 70%, automated threat alerts.",
		category: "ai",
		image: "https://placehold.co/600x600/1a1a1a/FFF",
	},
];

export const WORK_EXPERIENCE = [
  {
    id: 'w1',
    company: 'KronML',
    role: 'Frontend and AI Engineer',
    description: 'Worked with several frontend and backend frameworks and made 100s of AI automation across different domains.',
    duration: '6 MONTHS'
  },
  {
    id: 'w2',
    company: 'Marrfa',
    role: 'Founding Engineer',
    description: 'Architected the core platform infrastructure and led a team of 3 developers to ship the MVP in record time.',
    duration: '1 YEAR'
  },
  {
    id: 'w3',
    company: 'TechCorp',
    role: 'Backend Intern',
    description: 'Optimized database queries reducing latency by 40% and implemented secure authentication flows.',
    duration: '3 MONTHS'
  },
  {
    id: 'w4',
    company: 'InnovateX',
    role: 'Full Stack Developer',
    description: 'Developed a real-time collaboration tool using WebSockets and React, serving over 500 active users.',
    duration: '8 MONTHS'
  },
  {
    id: 'w5',
    company: 'Freelance',
    role: 'Web Developer',
    description: 'Delivered custom web solutions for diverse clients, focusing on performance, accessibility, and SEO.',
    duration: '2 YEARS'
  }
];