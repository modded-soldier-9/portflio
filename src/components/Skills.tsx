'use client';

import { motion } from 'framer-motion';
import { Shield, Laptop, Server, Star, Zap, Target } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation, scrollVariants, scaleIn } from '@/hooks/useScrollAnimation';

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation(0.2);

  const skillCategories = [
    {
      title: 'Cybersecurity',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-500/30',
      description: 'Protecting digital assets and infrastructure',
      skills: [
        { name: 'Cyber Security Risk', level: 95 },
        { name: 'Security Protocols', level: 90 },
        { name: 'Network Security', level: 88 },
        { name: 'Threat Detection', level: 92 },
        { name: 'Vulnerability Assessment', level: 85 },
        { name: 'Security Management', level: 90 },
      ],
    },
    {
      title: 'Programming & Development',
      icon: Laptop,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      description: 'Building scalable and secure applications',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 88 },
        { name: 'API Development', level: 87 },
        { name: 'SQL', level: 82 },
        { name: 'Linux', level: 80 },
      ],
    },
    {
      title: 'IT & Cloud',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      description: 'Managing infrastructure and cloud solutions',
      skills: [
        { name: 'AWS', level: 88 },
        { name: 'Cloud Architecture', level: 85 },
        { name: 'IT Management', level: 92 },
        { name: 'Infrastructure', level: 87 },
        { name: 'Microsoft Excel', level: 90 },
        { name: 'System Administration', level: 83 },
      ],
    },
  ];


  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Technical Expertise</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive skill set spanning cybersecurity, development, and cloud technologies, 
            continuously evolving with industry trends.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          className="max-w-7xl mx-auto"
          variants={scrollVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="card group relative overflow-hidden"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                transition={{ duration: 0.3 }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(skill.level / 20)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                          <span className="text-gray-400 text-sm ml-2">{skill.level}%</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCategory === index ? 1 : 0 }}
                />

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">8+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">20+</div>
              <div className="text-gray-400">Technologies Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
