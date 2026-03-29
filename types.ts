export interface NavItem {
	label: string;
	href: string;
}

export interface ServiceItem {
	title: string;
	description: string;
	icon?: string;
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

export interface CaseStudy {
	id: string;
	title: string;
	description: string;
	problem: string;
	solution: string;
	outcome: string;
	techStack: string[];
	images: string[];
	links: {
		live?: string;
		github?: string;
	};
}