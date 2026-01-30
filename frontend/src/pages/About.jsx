import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Users, Mic, Video, Image, FileText, Lock, Cpu, Github, Linkedin, Mail } from 'lucide-react';
import gauravImg from '../assets/Gaurav.jpeg';
import priyanshuImg from '../assets/Priyanshu.jpeg';
import rishikaImg from '../assets/Rishika.jpeg';
import soumyaImg from '../assets/Soumya.jpeg';

const TeamMember = ({ name, role, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="cyber-card group text-center p-6 relative overflow-hidden"
  >
    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
    <p className="text-blue-600 dark:text-cyber-accent text-sm font-medium mb-4">{role}</p>
    <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors">
        <Github size={20} />
      </button>
      <button className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors">
        <Linkedin size={20} />
      </button>
      <button className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors">
        <Mail size={20} />
      </button>
    </div>
  </motion.div>
);

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block p-4 rounded-full bg-blue-100 dark:bg-cyber-accent/10 border border-blue-200 dark:border-cyber-accent/30 mb-4 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
          >
            <Shield size={64} className="text-blue-600 dark:text-cyber-accent animate-pulse-glow" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 dark:from-white dark:via-cyber-accent dark:to-blue-500 bg-clip-text text-transparent">
            Defending Truth in the Digital Age
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            AI Guardian represents the next generation of digital forensics, leveraging advanced artificial intelligence to expose synthetic media and protect the integrity of information.
          </p>
        </motion.div>

        {/* Mission Card */}
        <motion.div variants={itemVariants} className="cyber-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={120} className="text-slate-900 dark:text-white" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Users className="text-blue-600 dark:text-cyber-accent" /> Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              In an era where "seeing is believing" is no longer a guarantee, our mission is to democratize access to enterprise-grade deepfake detection tools. We strive to create a safer digital environment where individuals, journalists, and organizations can verify the authenticity of digital media in real-time.
            </p>
          </div>
        </motion.div>

        {/* Technology Grid */}
        <div className="space-y-8">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-slate-900 dark:text-white">
            Core Technologies
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="cyber-card group hover:translate-y-[-5px] transition-all duration-300">
              <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <Video size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Video Forensics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Frame-by-frame analysis using Convolutional Neural Networks (CNNs) to detect temporal inconsistencies and facial artifacts invisible to the human eye.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="cyber-card group hover:translate-y-[-5px] transition-all duration-300">
              <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Image size={32} className="text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Image Verification</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Pixel-level analysis to detect manipulation traces, GAN fingerprints, and metadata inconsistencies in AI-generated imagery.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="cyber-card group hover:translate-y-[-5px] transition-all duration-300">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <Mic size={32} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Audio Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Advanced spectral analysis and MFCC feature extraction to distinguish between organic vocal cord vibrations and synthesized speech patterns.
              </p>
            </motion.div>

             <motion.div variants={itemVariants} className="cyber-card group hover:translate-y-[-5px] transition-all duration-300">
              <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                <FileText size={32} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Text Verification</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Natural Language Processing (NLP) models trained on millions of texts to identify statistical anomalies typical of LLM-generated content.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Features/Values */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="cyber-card border-l-4 border-l-blue-600 dark:border-l-cyber-accent">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="text-blue-600 dark:text-cyber-accent" /> Privacy First Architecture
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We process all media securely. Your uploads are analyzed in an isolated environment and are never used to train our models without explicit permission.
            </p>
          </div>
          <div className="cyber-card border-l-4 border-l-purple-500">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="text-purple-500" /> Continuous Learning
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Our models are continuously updated to adapt to the latest generation of generative adversarial networks (GANs) and diffusion models.
            </p>
          </div>
        </motion.div>
        <div className="space-y-8">
        </div>
      </motion.div>
    </div>
  );
};

export default About;
