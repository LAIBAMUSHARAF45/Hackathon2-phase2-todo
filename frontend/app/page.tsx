'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const HomePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/signin');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="bg-glow glow-1 animate-pulse" />
      <div className="bg-glow glow-2" />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6 inline-block">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-white/20">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2">
          Todo.<span className="gradient-text">App</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-cyan-500 mb-12 opacity-80">
          Smart Task Management
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]"
              animate={{ left: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 animate-pulse">
            Loading...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
