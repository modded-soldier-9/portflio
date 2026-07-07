import { Github, Linkedin, Mail } from 'lucide-react';
import type { SocialLink } from '@/types';
import { siteConfig } from './site';

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: siteConfig.github.url, icon: Github },
  { name: 'LinkedIn', url: siteConfig.linkedin, icon: Linkedin },
  { name: 'Email', url: `mailto:${siteConfig.contact.email}`, icon: Mail },
];
