'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

const ExpandableCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  defaultExpanded = false,
  className = ''
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      className={`card group relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/30 transition-colors duration-300"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-4">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 group-hover:text-white transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-700/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ExpandableCard;
