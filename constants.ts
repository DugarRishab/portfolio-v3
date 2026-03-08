import { NavItem, ServiceItem, ProjectItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'work', href: '/work' },
  { label: 'about', href: '/about' },
  { label: 'contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Landing Page',
    description: 'I specialize in creating high-quality, effective landing pages that help businesses achieve their online marketing goals.'
  },
  {
    title: 'SAAS Applications',
    description: 'I specialize in creating high-quality, effective landing pages that help businesses achieve their online marketing goals.'
  },
  {
    title: 'E-Commerce',
    description: 'I specialize in creating high-quality, effective landing pages that help businesses achieve their online marketing goals.'
  }
];

export const CRYSTAL_IMAGES = {
  img1: 'crystals/crystal1.png',
  img2: 'crystals/crystal2.png',
  img3: 'crystals/crystal3.png',
  img4: 'crystals/crystal4.png',
  img5: 'crystals/crystal5.png',
  img6: 'crystals/crystal6.png',
};

export const SKILLS = [
  { name: 'Node.js', color: '#68A063' },
  { name: 'React', color: '#61DAFB' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Google Cloud', color: '#4285F4' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Tailwind', color: '#06B6D4' },
];

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'Marrfa Platform',
    role: 'Full Stack Developer',
    description: 'Built a comprehensive real-estate platform connecting agents and buyers.',
    category: 'software',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  },
  {
    id: '2',
    title: 'Autonomous Drone',
    role: 'Embedded Systems Engineer',
    description: 'Developed flight controller software for a custom-built quadcopter.',
    category: 'electrical',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  },
  {
    id: '3',
    title: 'Sentiment Analysis AI',
    role: 'ML Engineer',
    description: 'NLP model to analyze customer feedback with 94% accuracy.',
    category: 'ai',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  },
  {
    id: '4',
    title: 'Smart Home Hub',
    role: 'IoT Developer',
    description: 'Centralized control system for various smart home protocols.',
    category: 'electrical',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  },
  {
    id: '5',
    title: 'Crypto Wallet',
    role: 'Frontend Developer',
    description: 'Secure and intuitive cryptocurrency wallet interface.',
    category: 'software',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  },
   {
    id: '6',
    title: 'Object Detection',
    role: 'AI Researcher',
    description: 'Real-time object detection system for security cameras.',
    category: 'ai',
    image: 'https://placehold.co/600x600/1a1a1a/FFF'
  }
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