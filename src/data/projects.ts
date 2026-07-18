export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  type: string;
}

export const projects: Project[] = [
  {
    id: 'qodex',
    name: 'Qodex',
    description: 'Web development agency website — built with Next.js 15, TypeScript, Tailwind CSS. Features service showcases, client testimonials, contact forms.',
    tech: ['TypeScript', 'Next.js', 'Tailwind'],
    liveUrl: 'https://www.qodex.co.za',
    type: 'Client Work',
  },
  {
    id: 'midostransport',
    name: 'Midostransport',
    description: 'Full-stack transportation management platform for a heavy haulage company. Fleet management, logistics tracking, client portal.',
    tech: ['TypeScript', 'Next.js', 'Tailwind'],
    liveUrl: 'https://www.midostransport.co.za',
    type: 'Client Work',
  },
  {
    id: 'sa-digital-license',
    name: 'SA Digital License',
    description: 'Mobile-first web app for South African drivers — digital driver\'s license display, traffic fine tracker, 11 official languages supported.',
    tech: ['TypeScript', 'React'],
    liveUrl: 'https://demo-digital-liscense.vercel.app',
    githubUrl: 'https://github.com/modded-soldier-9/demo-digital-liscense',
    type: 'Demo/Concept',
  },
  {
    id: 'whatsapp-ai-bot',
    name: 'WhatsApp AI Bot',
    description: 'Modular WhatsApp bot powered by Google Gemini AI. Customizable personalities, conversation memory, multi-language support, token optimization.',
    tech: ['JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/modded-soldier-9/whats-bot',
    type: 'Open Source',
  },
  {
    id: 'browser-fingerprint-honeypot',
    name: 'Browser Fingerprint Honeypot',
    description: 'Advanced browser fingerprinting research tool for cybersecurity education. Demonstrates reconnaissance techniques and privacy analysis.',
    tech: ['TypeScript'],
    githubUrl: 'https://github.com/modded-soldier-9/honeypot',
    type: 'Security Research',
  },
  {
    id: 'p2p-media',
    name: 'P2P Media',
    description: 'Portfolio and CRM for a photography business. Client portal, staff portal, booking management. Consulted on hosting and backend architecture.',
    tech: ['TypeScript', 'React', 'Convex'],
    liveUrl: 'https://p2pmedia.co.za',
    type: 'Consulting',
  },
];
