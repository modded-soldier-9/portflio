'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/modded-soldier-9',
      icon: Github,
      color: 'hover:text-gray-400',
      bgColor: 'hover:bg-gray-800/50'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mohamedelsheikh',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-500/10'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/mohamedelsheikh',
      icon: Twitter,
      color: 'hover:text-cyan-400',
      bgColor: 'hover:bg-cyan-500/10'
    },
    {
      name: 'Email',
      url: 'mailto:mohamed@example.com',
      icon: Mail,
      color: 'hover:text-red-400',
      bgColor: 'hover:bg-red-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="flex space-x-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 transition-all duration-300 ${link.color} ${link.bgColor} group`}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            rotate: [0, -5, 5, 0]
          }}
          whileTap={{ scale: 0.95 }}
          title={`Visit ${link.name}`}
        >
          <link.icon className="w-5 h-5" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
