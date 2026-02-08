'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
  label: string;
  id: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  textarea = false,
  rows = 3
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `w-full px-5 py-3.5 bg-slate-900/50 border backdrop-blur-sm rounded-xl text-slate-100 placeholder-transparent focus:outline-none ring-offset-black transition-all duration-500 ${error
    ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
    : isFocused
      ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20'
      : 'border-white/5 hover:border-white/10'
    }`;

  return (
    <motion.div
      animate={error ? { x: [-3, 3, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder=" "
          className={`${inputClasses} resize-none`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}

      <label
        htmlFor={id}
        className={`absolute left-5 transition-all duration-300 pointer-events-none tracking-wide ${value || isFocused
          ? '-top-2.5 text-[10px] font-bold uppercase text-cyan-400 opacity-100 translate-x-1'
          : 'top-4 text-sm text-slate-500 opacity-60'
          }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {error && (
        <p className="mt-2 text-[11px] font-bold uppercase tracking-tight text-red-400 flex items-center px-1">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      {/* Subtle bottom line transition */}
      <div className={`absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
};

export default InputField;