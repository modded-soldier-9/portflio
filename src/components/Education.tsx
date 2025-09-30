'use client';

import { motion } from 'framer-motion';
import { Calendar, GraduationCap } from 'lucide-react';

const Education = () => {
  const education = [
    {
      institution: 'Richfield',
      degree: 'Bachelor of Science in Information Technology (BSc IT)',
      duration: 'Feb 2023 - Dec 2025 (Expected)',
      skills: ['JavaScript', 'Python', 'Programming'],
    },
    {
      institution: 'Jordao College',
      degree: 'National Senior Certificate',
      duration: '',
      skills: ['Programming', 'English as a Second Language (ESL)'],
    },
  ];

  return (
    <section id="education" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {edu.institution}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {edu.degree}
                </p>
                
                {edu.duration && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
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
