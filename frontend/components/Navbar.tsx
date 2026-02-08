'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <motion.nav
        className="
          container mx-auto max-w-7xl
          glass-morphism rounded-full px-6 py-3
          flex justify-between items-center
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          border border-white/10
          pointer-events-auto
        "
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo / Brand */}
        <Link
          href="/dashboard"
          className="
            text-xl md:text-2xl font-black
            tracking-tighter
            gradient-text
            transition-all duration-300
            hover:scale-105
          "
        >
          TODO.AI
        </Link>

        {/* User Section */}
        {user && (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">
                Online
              </span>
              <span className="text-sm font-medium text-slate-200">
                {user.name || user.email.split('@')[0]}
              </span>
            </div>

            {/* Avatar Cluster */}
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <motion.div
                  className="
                    w-10 h-10 rounded-full
                    bg-gradient-to-br from-cyan-400 to-blue-600
                    flex items-center justify-center
                    text-white font-bold text-sm
                    border-2 border-white/20
                    shadow-lg
                    cursor-pointer
                  "
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </motion.div>
                <div className="
                  absolute -inset-1 rounded-full border border-cyan-400/50
                  animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity
                "></div>
              </div>

              {/* Logout button */}
              <button
                onClick={logout}
                className="
                  px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                  bg-white/5 text-slate-300 hover:text-white hover:bg-red-500/20
                  border border-white/5 hover:border-red-500/30
                  transition-all duration-300
                "
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </motion.nav>
    </div>
  );
};

export default Navbar;
