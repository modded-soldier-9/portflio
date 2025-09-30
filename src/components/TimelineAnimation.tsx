'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TimelineAnimationProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

const TimelineAnimation = ({ children, index, className = '' }: TimelineAnimationProps) => {
  const { ref, isInView } = useScrollAnimation(0.3);

  const variants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default TimelineAnimation;
