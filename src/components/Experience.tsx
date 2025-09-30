'use client';

import { motion } from 'framer-motion';
import { Shield, Server } from 'lucide-react';
import InteractiveTimeline from './InteractiveTimeline';

const Experience = () => {
  const experiences = [
    {
      id: 'quota-libex-head-cyber-security',
      title: 'Head of Cyber Security',
      company: 'Quota Libex',
      type: 'Full-time',
      duration: 'Jul 2024 - Present',
      location: 'Johannesburg Metropolitan Area (On-site)',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      responsibilities: [
        'Leading cybersecurity initiatives and implementing robust security protocols',
        'Developing and maintaining API security standards',
        'Managing security infrastructure and team operations',
        'Conducting security audits and risk assessments',
      ],
      skills: ['API Development', 'Cybersecurity', 'Security Protocols'],
      achievements: [
        'Implemented comprehensive security protocols reducing security incidents by 40%',
        'Led team of 5 security professionals in threat detection and response',
        'Established security training program for 200+ employees'
      ],
      description: 'Leading cybersecurity initiatives and implementing robust security protocols at Quota Libex, focusing on API security and threat detection.'
    },
    {
      id: 'midostransport-it-manager',
      title: 'Information Technology Manager',
      company: 'Midostransport',
      type: 'Part-time',
      duration: 'Nov 2016 - Present',
      location: 'South Africa',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      responsibilities: [
        'Overseeing IT infrastructure and systems management',
        'Leading technology implementation and maintenance',
        'Managing IT projects and team coordination',
        'Implementing and maintaining IT security protocols',
      ],
      skills: ['Microsoft Excel', 'Information Technology', 'IT Management', 'Infrastructure'],
      achievements: [
        'Successfully migrated company infrastructure to cloud-based solutions',
        'Reduced IT operational costs by 25% through process optimization',
        'Implemented disaster recovery procedures with 99.9% uptime'
      ],
      description: 'Overseeing comprehensive IT operations and infrastructure management, ensuring optimal performance and security across all systems.'
    },
  ];


  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Professional Experience</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A journey of growth, leadership, and technical excellence across cybersecurity and IT management roles.
          </p>
        </motion.div>

        <InteractiveTimeline items={experiences} />
      </div>
    </section>
  );
};

export default Experience;
