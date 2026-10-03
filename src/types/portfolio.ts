export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  detailedDescription?: string;
  category: string;
  status: 'Live' | 'In Development' | 'Completed';
  liveUrl?: string;
  githubUrl?: string;
  isPrivate: boolean;
  featured: boolean;
  tags: string[];
  role: string;
  period: string;
  keyFeatures: string[];
  metrics?: { label: string; value: string }[];
  color?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: string;
  order: string;
  summary: string;
  bullets: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  session: string;
  grade: string;
  details: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; category: string; highlight?: boolean }[];
}

export interface EngineeringMindsetPrinciple {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  bullets: string[];
}
