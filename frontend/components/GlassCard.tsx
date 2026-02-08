'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  intensity?: 'low' | 'medium' | 'high';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  intensity = 'medium'
}) => {
  const intensities = {
    low: 'bg-white/5 border-white/5 backdrop-blur-md',
    medium: 'glass-morphism',
    high: 'glass shadow-2xl border-white/10 backdrop-blur-xl'
  };

  const cardClasses = `rounded-2xl p-6 ${intensities[intensity]} ${className}`;

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        className={cardClasses}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default GlassCard;