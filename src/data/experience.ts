export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: 'independent',
    title: 'Independent Security Researcher',
    company: 'Self-employed',
    duration: '2025 — Present',
    description: 'Vulnerability research, responsible disclosure, security auditing, and full-stack web development for clients.',
    skills: ['Penetration Testing', 'Web Security', 'Python', 'Responsible Disclosure'],
    achievements: [],
  },
  {
    id: 'quota-libex',
    title: 'Head of Cyber Security',
    company: 'Quota Libex',
    duration: '2024 — 2025',
    description: 'Led the security function — protocols, API security, threat detection, team of 5. Reduced incidents by 40%.',
    skills: ['API Security', 'Team Leadership', 'Security Protocols'],
    achievements: ['Reduced security incidents by 40%', 'Security training for 200+ employees'],
  },
  {
    id: 'midostransport',
    title: 'IT Manager',
    company: 'Midostransport',
    duration: '2016 — Present',
    description: 'Infrastructure, cloud migration, disaster recovery. Reduced IT costs by 25%, 99.9% uptime.',
    skills: ['Cloud', 'Infrastructure', 'Disaster Recovery'],
    achievements: ['Cloud migration', '25% cost reduction', '99.9% uptime'],
  },
];
