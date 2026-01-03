'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 particle-bg">
      <div className="text-center">
        <div className="text-4xl font-bold gradient-text mb-4">Todo App</div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default HomePage;