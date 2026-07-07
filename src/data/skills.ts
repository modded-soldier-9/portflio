import { Shield, Laptop, Server } from 'lucide-react';
import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Cybersecurity',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    description: 'Protecting digital assets and infrastructure',
    skills: [
      { name: 'Cyber Security Risk', level: 95 },
      { name: 'Security Protocols', level: 90 },
      { name: 'Network Security', level: 88 },
      { name: 'Threat Detection', level: 92 },
      { name: 'Vulnerability Assessment', level: 85 },
      { name: 'Security Management', level: 90 },
    ],
  },
  {
    title: 'Programming & Development',
    icon: Laptop,
    color: 'from-indigo-500 to-purple-500',
    description: 'Building scalable and secure applications',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML/CSS', level: 88 },
      { name: 'API Development', level: 87 },
      { name: 'SQL', level: 82 },
      { name: 'Linux', level: 80 },
    ],
  },
  {
    title: 'IT & Cloud',
    icon: Server,
    color: 'from-indigo-500 to-purple-500',
    description: 'Managing infrastructure and cloud solutions',
    skills: [
      { name: 'AWS', level: 88 },
      { name: 'Cloud Architecture', level: 85 },
      { name: 'IT Management', level: 92 },
      { name: 'Infrastructure', level: 87 },
      { name: 'Microsoft Excel', level: 90 },
      { name: 'System Administration', level: 83 },
    ],
  },
];

export const skillStats = [
  { value: '8+', label: 'Years Experience' },
  { value: '15+', label: 'Certifications Earned' },
  { value: '200+', label: 'People Trained' },
];
