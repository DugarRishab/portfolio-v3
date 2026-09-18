import caseStudiesJson from "../data/case-studies.json";
import projectsJson from "../data/projects.json";
import servicesJson from "../data/services.json";
import testimonialsJson from "../data/testimonials.json";
import workexJson from "../data/workex.json";
import { CaseStudy, Project, ServiceDetail, Testimonial, WorkExperience } from "../types";

export const caseStudiesData = caseStudiesJson as CaseStudy[];
export const projectsData = projectsJson as Project[];
export const servicesData = servicesJson as ServiceDetail[];
export const testimonialsData = testimonialsJson as Testimonial[];
export const workexData = workexJson as WorkExperience[];

export const getCaseStudyById = (id?: string) =>
	caseStudiesData.find((s) => s.id === id);

export const getServiceBySlug = (slug?: string) =>
	servicesData.find((s) => s.slug === slug);

export const getWorkexById = (id?: string) =>
	workexData.find((item) => item.id === id);
