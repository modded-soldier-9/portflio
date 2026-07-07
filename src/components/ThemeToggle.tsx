'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Moon className="w-5 h-5" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'dark':
        return 'Switch to Light Mode';
      case 'light':
        return 'Switch to System Mode';
      case 'system':
        return 'Switch to Dark Mode';
      default:
        return 'Toggle Theme';
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:border-primary transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-current"
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
      
      {/* Theme indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default ThemeToggle;
