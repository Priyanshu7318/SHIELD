import React, { useState } from 'react';
import client from '../services/api';
import { Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    try {
      await client.post('/dashboard/feedback', { message });
      setStatus('success');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-card"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-teal-500/20 rounded-full">
            <MessageSquare size={32} className="text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Feedback</h1>
            <p className="text-slate-400">Help us improve AI Guardian</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-colors resize-none"
              placeholder="Tell us about your experience, report bugs, or suggest new features..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'loading'}
            />
          </div>

          <div className="flex items-center justify-between">
            {status === 'error' && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle size={16} className="mr-2" />
                {errorMsg}
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex items-center text-green-400 text-sm">
                <CheckCircle size={16} className="mr-2" />
                Thank you for your feedback!
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !message.trim()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                status === 'loading' || !message.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-lg hover:shadow-teal-500/25 text-white ml-auto'
              }`}
            >
              {status === 'loading' ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;
