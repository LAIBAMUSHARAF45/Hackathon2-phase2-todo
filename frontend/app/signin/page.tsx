'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signin } from '../../lib/api';
import GlassCard from '../../components/GlassCard';
import AuthForm from '../../components/AuthForm';
import toast from 'react-hot-toast';

const SigninPage = () => {
  const router = useRouter();

  const handleSignin = async (data: any) => {
    try {
      const response = await signin(data);
      if (typeof window !== 'undefined' && response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      toast.success('Access Granted');
      router.push('/dashboard');
    } catch (error) {
      console.error('Signin error:', error);
      toast.error('Authentication Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard intensity="high" className="p-8 md:p-10">
          <AuthForm type="signin" onSubmit={handleSignin} />
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SigninPage;
