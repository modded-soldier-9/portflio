'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardFlipProps {
  children: React.ReactNode;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const CardFlip = ({ frontContent, backContent, className = '' }: CardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      style={{ perspective: '1000px' }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </motion.div>
        
        {/* Back of card */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CardFlip;
