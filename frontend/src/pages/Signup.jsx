import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.username, formData.email, formData.password);
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError('Unable to connect to the server. Please check if the backend is running.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] relative z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="cyber-card w-full max-w-md relative overflow-hidden group"
      >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-accent/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>

        <div className="flex flex-col items-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-cyber-accent/10 p-4 rounded-full mb-4 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            <UserPlus size={32} className="text-cyber-accent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold bg-gradient-to-r from-white to-cyber-accent bg-clip-text text-transparent"
          >
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-sm mt-2"
          >
            Join the digital defense network
          </motion.p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-slate-400 text-sm mb-1 ml-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="cyber-input hover:border-cyber-accent/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all duration-300"
              required
              placeholder="Choose your codename"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-slate-400 text-sm mb-1 ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="cyber-input hover:border-cyber-accent/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all duration-300"
              required
              placeholder="secure@example.com"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-slate-400 text-sm mb-1 ml-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="cyber-input hover:border-cyber-accent/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all duration-300"
              required
              placeholder="••••••••"
            />
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="cyber-button mt-4 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
          >
            Sign Up
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center text-slate-400 text-sm"
        >
          Already have an account? <Link to="/login" className="text-cyber-accent hover:text-white hover:underline transition-colors">Login</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
