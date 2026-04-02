export interface NavItem {
	label: string;
	href: string;
}

export interface ServiceItem {
	title: string;
	description: string;
	icon?: string;
	slug?: string;
}

export interface ServiceUseCase {
	title: string;
	description: string;
	icon: string;
}

export interface ServiceExample {
	title: string;
	problem: string;
	solution: string;
	outcome: string;
	image?: string;
}

export interface ServiceBenefit {
	title: string;
	description: string;
	icon: string;
}

export interface ServiceDetail {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	icon: string;
	heroImage?: string;
	useCases: ServiceUseCase[];
	examples: ServiceExample[];
	benefits: ServiceBenefit[];
	techStack: string[];
	cta: {
		headline: string;
		subtext: string;
	};
}

export interface ProjectItem {
	id: string;
	title: string;
	role: string;
	description: string;
	image?: string;
	link?: string;
	category?: "software" | "electrical" | "ai";
}

export interface WorkResponsibility {
	title: string;
	description: string;
}

export interface WorkExperience {
	id: string;
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	overview: string;
	responsibilities: WorkResponsibility[];
	technologies: string[];
	impact: string;
	impactAuthor: string;
	image?: string;
	featured: boolean;
	cardBg: string;
}

export interface Project {
	id: string;
	title: string;
	desc: string;
	link: string;
	img: string;
	tags: string[];
}

export interface Testimonial {
	name: string;
	tagline?: string;
	desc: string;
	rating: number;
	logo: string;
	cc: string;
	country: string;
}

export interface CaseStudyMetric {
	value: string;
	label: string;
	icon?: string;
}

export interface CaseStudySection {
	type: "text" | "code" | "diagram" | "image" | "callout" | "list";
	title?: string;
	content?: string;
	language?: string; // for code blocks
	items?: string[]; // for lists
	variant?: "info" | "warning" | "success"; // for callouts
	diagramType?:
		| "automation"
		| "microservices"
		| "payment"
		| "data-flow"
		| "event-driven"
		| "custom";
	imageUrl?: string;
	imageCaption?: string;
}

export interface CaseStudy {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	publishedDate?: string;
	readingTime?: string;
	tags?: string[];
	problem: string;
	problemDetails?: CaseStudySection[];
	solution: string;
	solutionDetails?: CaseStudySection[];
	outcome: string;
	outcomeDetails?: CaseStudySection[];
	metrics?: CaseStudyMetric[];
	architectureType?:
		| "automation"
		| "microservices"
		| "payment"
		| "data-flow"
		| "event-driven";
	techStack: string[];
	images: string[];
	links: {
		live?: string;
		github?: string;
	};
	relatedStudies?: string[];
}