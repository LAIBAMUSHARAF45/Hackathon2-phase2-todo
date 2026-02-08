'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AuthButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "relative flex justify-center py-3 px-6 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 overflow-hidden group";

  const variantClasses = variant === 'primary'
    ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)]"
    : "text-cyan-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
    </motion.button>
  );
};

export default AuthButton;