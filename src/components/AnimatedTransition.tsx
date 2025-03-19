
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedTransition({ children, className = '' }: AnimatedTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for list items
export function StaggeredContainer({ 
  children, 
  className = '' 
}: AnimatedTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item for staggered lists
export function StaggeredItem({ 
  children, 
  className = '' 
}: AnimatedTransitionProps) {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
