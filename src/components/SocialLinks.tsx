'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/config/social';

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ name, url, icon: Icon }) => {
        const isExternal = url.startsWith('http');
        return (
          <motion.a
            key={name}
            href={url}
            aria-label={name}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid place-items-center w-10 h-10 rounded-lg bg-card border border-border text-muted hover:text-primary hover:border-primary transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
