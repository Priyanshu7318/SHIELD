import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Clock, Lock, Trash2, X } from 'lucide-react';
import client from '../services/api';

const UserPage = () => {
  const { user, logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.new !== passwordData.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    // Mock API call simulation
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ current: '', new: '', confirm: '' });
      setTimeout(() => setShowPasswordModal(false), 1500);
    }, 1500);
  };

  const handleDeleteAccount = async () => {
    setLoading(true);

    // Mock API call simulation
    setTimeout(() => {
      logout();
      setLoading(false);
      setShowDeleteModal(false);
    }, 2000);
  };

  if (!user) {
    return <div className="text-center p-8">Loading user profile...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <div className="flex items-center space-x-4 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 rounded-full bg-cyber-primary flex items-center justify-center text-black text-3xl font-bold"
          >
            {user.username.charAt(0).toUpperCase()}
          </motion.div>
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-purple-400"
            >
              {user.username}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-400">
              User Profile & Settings
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="cyber-card">
            <h2 className="text-xl font-bold mb-6 flex items-center text-cyber-primary">
              <User className="mr-2" /> Personal Information
            </h2>

            <div className="space-y-4">
              <div className="group">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Username</label>
                <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded border border-slate-700 group-hover:border-cyber-primary transition-colors">
                  <User size={18} className="text-slate-400" />
                  <span className="text-white">{user.username}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded border border-slate-700 group-hover:border-cyber-primary transition-colors">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-white">{user.email}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs text-slate-500 uppercase tracking-wider">User ID</label>
                <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded border border-slate-700 group-hover:border-cyber-primary transition-colors">
                  <Shield size={18} className="text-slate-400" />
                  <span className="text-white">UID-{user.id}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="cyber-card">
            <h2 className="text-xl font-bold mb-6 flex items-center text-purple-400">
              <Shield className="mr-2" /> Account Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded">
                <div>
                  <h3 className="font-bold text-green-400">Active Subscription</h3>
                  <p className="text-xs text-green-500/70">Free Plan</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Shield size={16} />
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Account Security</span>
                  <span className="text-cyber-primary text-sm font-bold">Good</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-cyber-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="cyber-card">
          <h2 className="text-xl font-bold mb-4 flex items-center text-blue-400">
            <Clock className="mr-2" /> Session Activity
          </h2>
          <p className="text-slate-400 mb-4">
            You are currently logged in. Your session is secure.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="cyber-button-secondary flex items-center"
            >
              <Lock size={16} className="mr-2" /> Change Password
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="cyber-button-secondary text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/50 flex items-center"
            >
              <Trash2 size={16} className="mr-2" /> Delete Account
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 p-6 rounded-lg w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-4 text-cyber-primary">Change Password</h3>

              {message.text && (
                <div className={`p-3 mb-4 rounded text-sm ${message.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyber-primary focus:outline-none"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyber-primary focus:outline-none"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyber-primary focus:outline-none"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cyber-button mt-4 flex justify-center items-center"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-red-500/30 p-6 rounded-lg w-full max-w-md shadow-2xl relative"
            >
              <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center">
                <Trash2 className="mr-2" /> Delete Account
              </h3>

              <p className="text-slate-300 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 px-4 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700 transition-colors flex justify-center items-center"
                >
                  {loading ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPage;
