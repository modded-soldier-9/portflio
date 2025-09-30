'use client';

import { motion } from 'framer-motion';
import { Shield, Cloud, Code, Server, Download, Mail, ArrowRight, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import TypingAnimation from './TypingAnimation';
import ParticleSystem from './ParticleSystem';
import SocialLinks from './SocialLinks';
import { useParallax } from '@/hooks/useParallax';

const Hero = () => {
  const parallaxOffset1 = useParallax(0.3);
  const parallaxOffset2 = useParallax(0.5);
  const parallaxOffset3 = useParallax(0.7);

  const skills = [
    { icon: Shield, label: 'Cybersecurity', color: 'from-red-500 to-pink-500' },
    { icon: Cloud, label: 'AWS Cloud', color: 'from-orange-500 to-yellow-500' },
    { icon: Code, label: 'Web Development', color: 'from-green-500 to-emerald-500' },
    { icon: Server, label: 'IT Management', color: 'from-blue-500 to-cyan-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden hero-gradient">
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxOffset1}px)` }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${-parallaxOffset2}px)` }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"
          style={{ transform: `translateY(${parallaxOffset3}px) translateX(${-parallaxOffset1}px)` }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="block text-white">Mohamed</span>
              <span className="block gradient-text">Elsheikh</span>
            </motion.h1>

            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-medium">
                <TypingAnimation 
                  texts={[
                    'Head of Cyber Security',
                    'AWS Academy Graduate',
                    'Cybersecurity Expert',
                    'Web Developer',
                    'IT Management Leader'
                  ]}
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={2500}
                />
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                <TypingAnimation 
                  texts={[
                    'AWS Academy Graduate • Cybersecurity Expert • Web Developer',
                    'Security Protocols • Cloud Architecture • Team Leadership',
                    'Risk Assessment • Threat Detection • System Administration',
                    'Python • JavaScript • AWS • Linux • SQL'
                  ]}
                  speed={60}
                  deleteSpeed={30}
                  pauseTime={3000}
                  className="text-indigo-400"
                />
              </p>
              <p className="text-lg text-gray-500 max-w-2xl">
                Leading cybersecurity initiatives and implementing robust security protocols 
                at Quota Libex. Passionate about building secure, scalable solutions and 
                mentoring the next generation of tech professionals.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center`}>
                    <skill.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary flex items-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="btn-secondary flex items-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-8"
              variants={itemVariants}
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30"></div>
                
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-2xl"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(99, 102, 241, 0.4)",
                      "0 0 0 20px rgba(99, 102, 241, 0)",
                      "0 0 0 0 rgba(99, 102, 241, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="/personal.jpg"
                    alt="Mohamed Elsheikh"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-indigo-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-indigo-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
