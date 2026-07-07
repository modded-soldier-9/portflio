'use client';

import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
import { siteConfig } from '@/config/site';
import { navItems } from '@/config/navigation';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-primary text-[#05140d] font-bold text-sm mono">
                {siteConfig.initials}
              </span>
              <span className="font-semibold text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              {siteConfig.role} at {siteConfig.company}. {siteConfig.location}.
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </motion.div>

          <nav aria-label="Footer">
            <h3 className="mono text-xs uppercase tracking-widest text-muted mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mono text-xs uppercase tracking-widest text-muted mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-muted hover:text-primary transition-colors break-words"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${siteConfig.contact.whatsappCountryCode}${siteConfig.contact.whatsapp}`}
                  className="text-muted hover:text-primary transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
