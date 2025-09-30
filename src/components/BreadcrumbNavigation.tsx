'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

const BreadcrumbNavigation = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const updateBreadcrumbs = () => {
      const sections = [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'experience', label: 'Experience', href: '#experience' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'mentorship', label: 'Mentorship', href: '#mentorship' },
        { id: 'education', label: 'Education', href: '#education' },
        { id: 'certifications', label: 'Certifications', href: '#certifications' },
        { id: 'skills', label: 'Skills', href: '#skills' },
        { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
        { id: 'contact', label: 'Contact', href: '#contact' },
      ];

      const scrollPosition = window.scrollY + 200;
      let activeSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            activeSection = section.id;
            break;
          }
        }
      }

      const currentIndex = sections.findIndex(s => s.id === activeSection);
      const newBreadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '#home', isActive: activeSection === 'home' }
      ];

      if (activeSection !== 'home') {
        const currentSection = sections[currentIndex];
        newBreadcrumbs.push({
          label: currentSection.label,
          href: currentSection.href,
          isActive: true
        });
      }

      setBreadcrumbs(newBreadcrumbs);
    };

    window.addEventListener('scroll', updateBreadcrumbs);
    updateBreadcrumbs(); // Initial call

    return () => window.removeEventListener('scroll', updateBreadcrumbs);
  }, []);

  if (breadcrumbs.length <= 1) return null;

  return (
    <motion.nav
      className="fixed top-20 left-6 z-40 hidden lg:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl px-4 py-3 shadow-xl">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              <motion.a
                href={item.href}
                className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                  item.isActive
                    ? 'text-indigo-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index === 0 && <Home className="w-4 h-4" />}
                <span>{item.label}</span>
              </motion.a>
            </li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
};

export default BreadcrumbNavigation;
