/**
 * Central identity & contact config.
 * Every component reads from here so names, links, and contact details
 * stay consistent in one place.
 */
export const siteConfig = {
  name: 'Mohamed Elsheikh',
  initials: 'ME',
  role: 'Head of Cyber Security',
  company: 'Quota Libex',
  tagline:
    'AWS-certified cybersecurity leader building secure, scalable systems and mentoring the next generation of tech talent.',
  roles: [
    'Head of Cyber Security',
    'AWS Academy Graduate',
    'Cloud Security Engineer',
    'IT Management Leader',
  ],
  url: 'https://mohamedelsheikh.dev',
  location: 'Johannesburg, South Africa',

  contact: {
    email: 'contact@mohamedelsheikh.dev',
    phoneDisplay: '+27 66 562 3383',
    // Local number without leading 0, used to build the wa.me link (ZA +27)
    whatsapp: '665623383',
    whatsappCountryCode: '27',
  },

  github: {
    username: 'modded-soldier-9',
    url: 'https://github.com/modded-soldier-9',
  },
  linkedin: 'https://www.linkedin.com/in/mohamed-elsheikh',
} as const;

export type SiteConfig = typeof siteConfig;
