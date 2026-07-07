'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { certificationGroups } from '@/data/certifications';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow justify-center">Credentials</span>
          <h2 className="section-heading mt-4">Professional Certifications</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in cybersecurity, cloud
            computing, and web development.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certificationGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.12 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{group.icon}</span>
                <span className="gradient-text">{group.title}</span>
              </h3>

              <ul className="space-y-4">
                {group.certifications.map((cert, ci) => (
                  <motion.li
                    key={ci}
                    className="cert-card"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: ci * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-foreground text-sm mb-1.5 leading-snug">
                      {cert.name}
                    </h4>

                    <p className="text-primary text-sm font-medium">{cert.issuer}</p>

                    <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{cert.issued}</span>
                    </div>

                    {cert.skills && (
                      <p className="text-xs text-muted mt-1">{cert.skills}</p>
                    )}

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2.5 text-primary hover:text-accent text-xs font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      Verify Credential
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
