'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { getTasks, createTask, Task } from '../../lib/api';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import TaskCard from '../../components/TaskCard';
import GlassCard from '../../components/GlassCard';
import TaskSkeleton from '../../components/TaskSkeleton';
import Modal from '../../components/Modal';
import TaskForm from '../../components/TaskForm';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleCreateTask = async (taskData: { title: string; description?: string }) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      toast.success('Task Sequence Initialized');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Initialization Failed');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
        <Navbar />

        {/* Background Glows */}
        <div className="bg-glow glow-1 animate-pulse-slow" />
        <div className="bg-glow glow-2" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 mb-16 relative z-10"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
              My <span className="gradient-text">Tasks</span>
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-500">
                Task Management Dashboard
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <TaskSkeleton key={idx} />
              ))
            ) : tasks.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskUpdate={(updatedTask) =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          String(t.id) === String(updatedTask.id) ? updatedTask : t
                        )
                      )
                    }
                    onTaskDelete={(taskId) =>
                      setTasks((prev) => prev.filter((t) => String(t.id) !== String(taskId)))
                    }
                  />
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-32"
              >
                <GlassCard intensity="high" className="inline-block px-12 py-10 border-white/5">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-200 mb-2 tracking-tight">System Idle</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Waiting for user directives. Initialize your first task to begin.
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating Add Button */}
        <motion.button
          className="fixed bottom-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-[0_10px_40px_rgba(6,182,212,0.4)] z-40 group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>

        {/* Task Creation Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
