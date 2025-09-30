'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: '#',
      label: 'GitHub',
    },
    {
      icon: Mail,
      href: 'mailto:mohamed@example.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2">Mohamed Elsheikh</h3>
            <p className="text-gray-300">
              Head of Cyber Security | AWS Academy Graduate
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center text-gray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>© 2024 Mohamed Elsheikh. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
