import React from 'react';
import { motion } from 'framer-motion';
import { Book, Terminal, FileText, Layers } from 'lucide-react';

const Documentation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <Book size={48} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Documentation</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive guides and resources to help you get the most out of AI Guardian.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="cyber-card">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="text-cyber-accent" /> Getting Started
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Welcome to AI Guardian. To begin using our platform, please ensure you have created an account.
                Once logged in, you can access your dashboard to view usage statistics and history.
              </p>
              <h3 className="text-lg font-semibold text-white mt-4">Quick Start Steps:</h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Register a new account or log in.</li>
                <li>Navigate to the specific detection tool (Video, Audio, etc.).</li>
                <li>Upload your media file or paste text.</li>
                <li>Wait for the AI analysis to complete.</li>
                <li>Review the detailed risk report.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="cyber-card">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="text-purple-400" /> Core Features
            </h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-white">Deepfake Detection</h3>
                <p className="text-sm text-slate-400">Advanced CNN models analyze frame-by-frame artifacts to identify face swaps and reenactments.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Voice Analysis</h3>
                <p className="text-sm text-slate-400">Spectral analysis checks for synthetic audio signatures and lack of natural breath patterns.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Text Verification</h3>
                <p className="text-sm text-slate-400">Statistical analysis of sentence structure and perplexity to flag AI-generated text.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="cyber-card">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="text-green-400" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">How accurate is the detection?</h3>
              <p className="text-slate-300">Our models currently achieve 94-98% accuracy on benchmark datasets. However, we recommend using the tool as an aid to human judgment rather than absolute proof.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Is my data private?</h3>
              <p className="text-slate-300">Yes. All uploaded media is processed in a sandboxed environment and deleted immediately after analysis unless you explicitly opt-in to our research program.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Documentation;
