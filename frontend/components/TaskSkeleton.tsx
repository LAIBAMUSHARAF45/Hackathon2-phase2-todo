'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const TaskSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <GlassCard intensity="high" className="h-full flex flex-col border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 w-3/4">
            <div className="h-6 w-6 rounded-full bg-slate-800 animate-pulse"></div>
            <div className="h-5 w-full bg-slate-800 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-1">
            <div className="h-8 w-8 bg-slate-800/50 rounded-lg animate-pulse"></div>
            <div className="h-8 w-8 bg-slate-800/50 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="h-4 bg-slate-800 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6 mb-6 animate-pulse"></div>

        <div className="mt-auto flex justify-between items-center">
          <div className="h-6 w-20 bg-slate-800/50 rounded-full animate-pulse"></div>
          <div className="h-4 w-12 bg-slate-800/30 rounded animate-pulse"></div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TaskSkeleton;