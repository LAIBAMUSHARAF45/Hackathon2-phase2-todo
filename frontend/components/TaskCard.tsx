'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleTaskCompletion, deleteTask, updateTask, Task } from '../lib/api';
import toast from 'react-hot-toast';
import GlassCard from './GlassCard';
import Modal from './Modal';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: string | number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleCompletion = async () => {
    try {
      const updatedTask = await toggleTaskCompletion(String(task.id));
      setIsCompleted(!isCompleted);
      onTaskUpdate && onTaskUpdate(updatedTask);
      toast.success(isCompleted ? 'Task pending' : 'Task completed', {
        style: {
          background: '#0f172a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast.error('Sync failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task forever?')) return;

    setIsDeleting(true);
    try {
      await deleteTask(String(task.id));
      onTaskDelete && onTaskDelete(task.id);
      toast.success('Task removed');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Deletion failed');
      setIsDeleting(false);
    }
  };

  const handleUpdateTask = async (taskData: { title: string; description?: string }) => {
    try {
      const updatedTask = await updateTask(String(task.id), taskData);
      onTaskUpdate && onTaskUpdate(updatedTask);
      setIsEditing(false);
      toast.success('Task updated');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Update failed');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <GlassCard intensity="high" className="group relative overflow-hidden h-full flex flex-col border-white/5 hover:border-cyan-500/30">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div
                onClick={handleToggleCompletion}
                className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 cursor-pointer
                  flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-white/20 hover:border-cyan-400/50'}
                `}
              >
                {isCompleted && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              <h3 className={`text-lg font-semibold truncate transition-all duration-300 ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                {task.title}
              </h3>
            </div>

            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                onClick={() => setIsEditing(true)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {!isCompleted && task.description && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed"
              >
                {task.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className={`px-2.5 py-1 rounded-full border ${isCompleted ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-500/10 border-slate-500/30 text-slate-400'}`}>
              {isCompleted ? 'Completed' : 'Pending'}
            </span>
            <span className="text-slate-600">
              {new Date(task.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </GlassCard>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Task"
      >
        <TaskForm
          task={task}
          onSubmit={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </motion.div>
  );
};

export default TaskCard;