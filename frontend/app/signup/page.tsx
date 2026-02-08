'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signup } from '../../lib/api';
import GlassCard from '../../components/GlassCard';
import AuthForm from '../../components/AuthForm';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (data: any) => {
    try {
      await signup(data);
      toast.success('Registration Successful');
      router.push('/signin');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Initialization Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard intensity="high" className="p-8 md:p-10">
          <AuthForm type="signup" onSubmit={handleSignup} />
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SignupPage;
