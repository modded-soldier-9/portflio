'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  responsibilities: string[];
  skills: string[];
  achievements?: string[];
  description?: string;
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const InteractiveTimeline = ({ items, className = '' }: InteractiveTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, items.length]);

  const currentItem = items[activeIndex];

  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToItem = (index: number) => {
    setActiveIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Timeline Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold text-white">Interactive Timeline</h3>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={prevItem}
              className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </motion.button>
            
            <motion.button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </motion.button>
            
            <motion.button
              onClick={nextItem}
              className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          {activeIndex + 1} of {items.length}
        </div>
      </div>

      {/* Timeline Dots */}
      <div className="flex justify-center space-x-4 mb-8">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => goToItem(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-indigo-500 scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-gray-900 z-10"></div>

            {/* Content Card */}
            <motion.div
              className="ml-20 card group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentItem.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <currentItem.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {currentItem.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
                        <Building className="w-5 h-5" />
                        <span>{currentItem.company}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">{currentItem.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end space-y-2 mt-4 lg:mt-0">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{currentItem.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{currentItem.location}</span>
                      </div>
                    </div>
                  </div>

                  {currentItem.description && (
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {currentItem.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        Key Responsibilities
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </h4>
                      <ul className="space-y-3">
                        {currentItem.responsibilities.map((responsibility, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start space-x-3 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{responsibility}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-3">
                        {currentItem.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className="skill-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  {currentItem.achievements && currentItem.achievements.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                      <ul className="space-y-2">
                        {currentItem.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start space-x-3 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveTimeline;
