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

export interface WorkChallenge {
	title: string;
	solution: string;
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
	achievements?: string[];
	keyHighlights?: string[];
	teamSize?: string;
	reportingTo?: string;
	toolsUsed?: string[];
	challenges?: WorkChallenge[];
	learnings?: string[];
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

export interface CodeExample {
	filename?: string;
	language: string;
	code: string;
}

export interface FigureData {
	caption: string;
	id?: string;
}

export type CaseStudySectionType =
	| "text"
	| "code"
	| "diagram"
	| "image"
	| "callout"
	| "list"
	| "mermaid"
	| "heading"
	| "subheading"
	| "quote"
	| "table"
	| "two-column"
	| "definition-list"
	| "figure";

export interface CaseStudySection {
	type: CaseStudySectionType;
	title?: string;
	content?: string;
	language?: string;
	items?: string[];
	variant?: "info" | "warning" | "success" | "error" | "tip";
	diagramType?:
		| "automation"
		| "microservices"
		| "payment"
		| "data-flow"
		| "event-driven"
		| "blockchain"
		| "container"
		| "custom";
	imageUrl?: string;
	imageCaption?: string;
	mermaidCode?: string;
	figureCaption?: string;
	figureId?: string;
	code?: CodeExample;
	definitions?: { term: string; definition: string }[];
	columns?: { left: CaseStudySection[]; right: CaseStudySection[] };
	quote?: string;
	author?: string;
	source?: string;
	headerLevel?: 2 | 3 | 4;
}

export interface CaseStudy {
	id: string;
	title: string;
	subtitle?: string;
	description: string;
	abstract?: string;
	publishedDate?: string;
	readingTime?: string;
	tags?: string[];
	problem: string;
	problemDetails?: CaseStudySection[];
	solution: string;
	solutionDetails?: CaseStudySection[];
	outcome: string;
	outcomeDetails?: CaseStudySection[];
	architecture?: CaseStudySection[];
	implementation?: CaseStudySection[];
	apiReference?: CaseStudySection[];
	conclusion?: string;
	metrics?: CaseStudyMetric[];
	architectureType?:
		| "automation"
		| "microservices"
		| "payment"
		| "data-flow"
		| "event-driven"
		| "blockchain"
		| "container";
	techStack: string[];
	images: string[];
	links: {
		live?: string;
		github?: string;
		docs?: string;
		paper?: string;
	};
	relatedStudies?: string[];
	citations?: { id: string; text: string; url?: string }[];
	readingOrder?: string[];
}