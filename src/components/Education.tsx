'use client';

import { motion } from 'framer-motion';
import { Calendar, GraduationCap } from 'lucide-react';
import { education } from '@/data/education';

const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow justify-center">Academic</span>
          <h2 className="section-heading mt-4">Education</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              className="timeline-item pl-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">{edu.institution}</h3>
              </div>

              <p className="text-muted-strong mb-2">{edu.degree}</p>

              {edu.duration && (
                <div className="flex items-center gap-1.5 text-sm text-muted mb-3">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{edu.duration}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
