import { Shield, Server } from 'lucide-react';
import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'quota-libex-head-cyber-security',
    title: 'Head of Cyber Security',
    company: 'Quota Libex',
    type: 'Full-time',
    duration: 'Jul 2024 - Present',
    location: 'Johannesburg Metropolitan Area (On-site)',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    responsibilities: [
      'Leading cybersecurity initiatives and implementing robust security protocols',
      'Developing and maintaining API security standards',
      'Managing security infrastructure and team operations',
      'Conducting security audits and risk assessments',
    ],
    skills: ['API Development', 'Cybersecurity', 'Security Protocols'],
    achievements: [
      'Implemented comprehensive security protocols reducing security incidents by 40%',
      'Led team of 5 security professionals in threat detection and response',
      'Established security training program for 200+ employees',
    ],
    description:
      'Leading cybersecurity initiatives and implementing robust security protocols at Quota Libex, focusing on API security and threat detection.',
  },
  {
    id: 'midostransport-it-manager',
    title: 'Information Technology Manager',
    company: 'Midostransport',
    type: 'Part-time',
    duration: 'Nov 2016 - Present',
    location: 'South Africa',
    icon: Server,
    color: 'from-indigo-500 to-purple-500',
    responsibilities: [
      'Overseeing IT infrastructure and systems management',
      'Leading technology implementation and maintenance',
      'Managing IT projects and team coordination',
      'Implementing and maintaining IT security protocols',
    ],
    skills: ['Microsoft Excel', 'Information Technology', 'IT Management', 'Infrastructure'],
    achievements: [
      'Successfully migrated company infrastructure to cloud-based solutions',
      'Reduced IT operational costs by 25% through process optimization',
      'Implemented disaster recovery procedures with 99.9% uptime',
    ],
    description:
      'Overseeing comprehensive IT operations and infrastructure management, ensuring optimal performance and security across all systems.',
  },
];
