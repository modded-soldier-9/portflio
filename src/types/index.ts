import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  id: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  icon: LucideIcon;
  color: string;
  responsibilities: string[];
  skills: string[];
  achievements: string[];
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  skills: string;
  link: string;
}

export interface CertificationGroup {
  title: string;
  icon: string;
  certifications: Certification[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  skills: string[];
}

export interface MentorshipAchievement {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface MentorshipSkill {
  icon: LucideIcon;
  label: string;
}
