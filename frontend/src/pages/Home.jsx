import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, AlertTriangle, Cpu, Globe, Lock, Linkedin, Github, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

import priyanshuImg from '../assets/Priyanshu.jpeg';
import gauravImg from '../assets/Gaurav.jpeg';
import rishikaImg from '../assets/Rishika.jpeg';
import soumyaImg from '../assets/Soumya.jpeg';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 p-6 bg-cyber-accent/10 rounded-full relative group cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 180 }}
      >
        <div className="absolute inset-0 bg-cyber-accent/20 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 bg-cyber-accent/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Shield size={64} className="text-cyber-accent relative z-10" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyber-accent via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
      >
        SHIELD
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
      >
        Advanced detection system for <span className="text-white font-medium shadow-cyber-accent/50 drop-shadow-md">Deepfakes</span>, <span className="text-white font-medium shadow-cyber-accent/50 drop-shadow-md">Voice Cloning</span>, and <span className="text-white font-medium shadow-cyber-accent/50 drop-shadow-md">AI-Generated Text</span>.
        Protect your digital integrity with state-of-the-art AI models.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex space-x-6"
      >
        <Link to="/signup" className="cyber-button px-8 py-3 text-lg shadow-lg shadow-cyber-accent/20 hover:shadow-cyber-accent/50 hover:scale-105 transition-all">
          Get Started
        </Link>
        <Link to="/login" className="px-8 py-3 rounded border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10 transition-colors text-lg font-medium hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
          Login
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4"
      >
        <FeatureCard
          icon={CheckCircle}
          title="Real-time Detection"
          desc="Instant analysis of media files using optimized local models and cloud verification."
          delay={0.9}
        />
        <FeatureCard
          icon={Cpu}
          title="Multi-Modal Intelligence"
          desc="Unified engine supporting Video, Audio, and Text analysis in one seamless platform."
          delay={1.0}
        />
        <FeatureCard
          icon={Lock}
          title="Enterprise Security"
          desc="Comprehensive risk assessment reports and secure data handling for all your content."
          delay={1.1}
        />
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-32 w-full max-w-6xl px-4 mb-20"
      >
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMemberCard
            name="Priyanshu Shakya"
            role="Model Training and Development  "
            desc="training and development of models for deepfake detection and analysis."
            image={priyanshuImg}
            linkedin="https://www.linkedin.com/in/priyanshu-shakya-4701aa2a1/"
            github="https://github.com/Priyanshu7318"
            email="priyanshushakya373@gmail.com"
            delay={0.1}
          />
          <TeamMemberCard
            name="Gaurav"
            role="Backend"
            desc="Manage the page loading and data processing."
            image={gauravImg}
            linkedin="https://www.linkedin.com/in/gourav-verma-2a2657364/"
            github="https://www.linkedin.com/in/gourav-verma-2a2657364/"
            email="Gourav25002@gmail.com"
            delay={0.2}
          />
          <TeamMemberCard
            name="Rishika Pandey"
            role="Frontend"
            desc="creating the amazing user interface."
            image={rishikaImg}
            linkedin="https://www.linkedin.com/in/rishika-pandey-5350ba396?utm_source=share&utm"
            github="https://github.com/Rishika9328"
            email="Pandeyrishika04@gmail.com"
            delay={0.3}
          />
          <TeamMemberCard
            name="Soumya Yavav"
            role="Database"
            desc="creating the database and managing the dataflow."
            image={soumyaImg}
            linkedin="https://www.linkedin.com/in/soumya-yadav-946116343/"
            github="https://github.com/soumyay214"
            email="soumyayadav738@gmail.com"
            delay={0.4}
          />
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay }}
    className="cyber-card p-8 flex flex-col items-center hover:bg-slate-800/80 transition-colors group"
  >
    <div className="p-4 bg-slate-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon size={32} className="text-cyber-accent" />
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-cyber-accent transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const TeamMemberCard = ({ name, role, desc, linkedin, github, email, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay }}
    className="cyber-card p-6 flex flex-col items-center text-center group hover:-translate-y-2 duration-300"
  >
    <div className="w-32 h-32 rounded-full bg-slate-800 mb-6 overflow-hidden border-2 border-cyber-accent/30 group-hover:border-cyber-accent transition-colors flex items-center justify-center">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <User size={64} className="text-slate-600 group-hover:text-cyber-accent transition-colors" />
      )}
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className="text-cyber-accent text-sm font-medium mb-3 uppercase tracking-wider">{role}</p>
    <p className="text-slate-400 text-sm mb-6">{desc}</p>

    <div className="flex space-x-4">
      <a href={linkedin} className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white text-slate-400 transition-colors">
        <Linkedin size={18} />
      </a>
      <a href={github} className="p-2 bg-slate-800 rounded-full hover:bg-gray-700 hover:text-white text-slate-400 transition-colors">
        <Github size={18} />
      </a>
      
      <a href={`mailto:${email}`} className="p-2 bg-slate-800 rounded-full hover:bg-red-500 hover:text-white text-slate-400 transition-colors">
        <Mail size={18} />
      </a>
    </div>
  </motion.div>
);

export default Home;
