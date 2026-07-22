import type { IconKey } from "@/lib/iconRegistry";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  keywords: string[];
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
  githubUrl?: string;
  demoUrl?: string;
  gradient: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  credentialUrl?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconKey;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  current?: boolean;
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description?: string;
}

export interface StatCounter {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
}
