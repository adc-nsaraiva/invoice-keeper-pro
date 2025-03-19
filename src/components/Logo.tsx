
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', withText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div 
        className={`bg-primary rounded-lg ${sizeClasses[size]} flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-2/3 h-2/3 text-primary-foreground"
        >
          <path 
            d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {withText && (
        <motion.div 
          className="text-xl font-semibold text-foreground"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          InvoiceKeeper
        </motion.div>
      )}
    </div>
  );
}
