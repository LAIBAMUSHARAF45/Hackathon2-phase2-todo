'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import InputField from './InputField';
import AuthButton from './AuthButton';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black gradient-text tracking-tighter uppercase">
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">
          {type === 'signin' ? 'Welcome back to your account' : 'Create your account to get started'}
        </p>
      </div>

      {type === 'signup' && (
        <InputField
          label="Full Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      <InputField
        type="email"
        label="Email Address"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <InputField
        type="password"
        label="Password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {type === 'signup' && (
        <InputField
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider px-1">
        {type === 'signin' ? (
          <>
            <label className="flex items-center cursor-pointer group">
              <input type="checkbox" className="hidden" />
              <div className="w-4 h-4 rounded border border-white/20 mr-2 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                <div className="w-2 h-2 bg-cyan-500 rounded-sm scale-0 transition-transform" />
              </div>
              <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-cyan-500 hover:text-cyan-400">Forgot password?</a>
          </>
        ) : (
          <label className="flex items-center cursor-pointer group">
            <input type="checkbox" required className="hidden" />
            <div className="w-4 h-4 rounded border border-white/20 mr-2 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
              <div className="w-2 h-2 bg-cyan-500 rounded-sm scale-0 transition-transform" />
            </div>
            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
              I agree to the terms
            </span>
          </label>
        )}
      </div>

      <div className="pt-4">
        <AuthButton
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (type === 'signin' ? 'Sign In' : 'Create Account')}
        </AuthButton>
      </div>

      <div className="text-center mt-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
          {type === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
          <Link
            href={type === 'signin' ? '/signup' : '/signin'}
            className="text-cyan-500 hover:text-cyan-400 ml-1 transition-colors"
          >
            {type === 'signin' ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </motion.form>
  );
};

export default AuthForm;