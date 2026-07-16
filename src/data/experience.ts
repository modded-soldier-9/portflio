import { Shield, Server } from 'lucide-react';
import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'independent-researcher',
    title: 'Independent Security Researcher',
    company: 'Self-employed',
    type: 'Full-time',
    duration: '2025 — Present',
    location: 'Johannesburg, South Africa',
    icon: Shield,
    color: '',
    responsibilities: [
      'Conducting vulnerability research and responsible disclosure',
      'Building secure web applications for clients',
      'Security auditing and penetration testing',
      'Open-source security tooling',
    ],
    skills: ['Penetration Testing', 'Web Security', 'Python', 'Responsible Disclosure'],
    achievements: [],
    description: 'Independent security research, web development consulting, and vulnerability disclosure.',
  },
  {
    id: 'quota-libex',
    title: 'Head of Cyber Security',
    company: 'Quota Libex',
    type: 'Full-time',
    duration: '2024 — 2025',
    location: 'Johannesburg',
    icon: Shield,
    color: '',
    responsibilities: [
      'Led cybersecurity initiatives and implemented security protocols',
      'Developed and maintained API security standards',
      'Managed security infrastructure and team operations',
      'Conducted security audits and risk assessments',
    ],
    skills: ['API Security', 'Cybersecurity', 'Team Leadership', 'Security Protocols'],
    achievements: [
      'Reduced security incidents by 40%',
      'Led a team of 5 security professionals',
      'Established security training for 200+ employees',
    ],
    description: 'Led the security function — protocols, API security, threat detection, team management.',
  },
  {
    id: 'midostransport',
    title: 'IT Manager',
    company: 'Midostransport',
    type: 'Part-time',
    duration: '2016 — Present',
    location: 'South Africa',
    icon: Server,
    color: '',
    responsibilities: [
      'IT infrastructure and systems management',
      'Cloud migration and maintenance',
      'IT security protocols and disaster recovery',
    ],
    skills: ['IT Management', 'Infrastructure', 'Cloud', 'Disaster Recovery'],
    achievements: [
      'Migrated infrastructure to cloud',
      'Reduced IT costs by 25%',
      '99.9% uptime on disaster recovery',
    ],
    description: 'Long-running infrastructure and IT operations role — cloud migration, cost optimization, reliability.',
  },
];
