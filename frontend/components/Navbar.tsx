'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md bg-black/20 border-b border-white/10 p-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className="text-2xl font-bold gradient-text">
            Todo
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-gray-300">
                Welcome, <span className="text-cyan-400">{user.name || user.email}</span>
              </span>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-cyan-400">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 rounded-full border border-cyan-400 animate-pulse opacity-70"></div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;