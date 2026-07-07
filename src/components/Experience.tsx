'use client';

import { motion } from 'framer-motion';
import InteractiveTimeline from './InteractiveTimeline';
import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow justify-center">Career</span>
          <h2 className="section-heading mt-4">Professional Experience</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            A journey of growth, leadership, and technical excellence across cybersecurity and IT
            management roles.
          </p>
        </motion.div>

        <InteractiveTimeline items={experiences} />
      </div>
    </section>
  );
};

export default Experience;
