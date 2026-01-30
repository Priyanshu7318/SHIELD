import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, Heart, ExternalLink, LogIn, Book, Code, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@aiguardian.com', label: 'Email' }
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-lg pt-16 pb-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity inline-flex">
              <Shield className="text-cyber-primary" />
              <span className="bg-gradient-to-r from-cyber-primary to-blue-400 bg-clip-text text-transparent">
                AI GUARDIAN
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced AI-powered detection system protecting digital integrity against deepfakes and synthetic media threats.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/check-video" className="hover:text-cyber-accent transition-colors flex items-center"><ExternalLink size={12} className="mr-2" /> Video Analysis</Link></li>
              <li><Link to="/check-voice" className="hover:text-cyber-accent transition-colors flex items-center"><ExternalLink size={12} className="mr-2" /> Audio Detection</Link></li>
              <li><Link to="/check-image" className="hover:text-cyber-accent transition-colors flex items-center"><ExternalLink size={12} className="mr-2" /> Image Forensics</Link></li>
              <li><Link to="/check-text" className="hover:text-cyber-accent transition-colors flex items-center"><ExternalLink size={12} className="mr-2" /> Text Verification</Link></li>
              <li><Link to="/login" className="hover:text-cyber-accent transition-colors flex items-center mt-4 text-white"><LogIn size={12} className="mr-2" /> Login / Sign Up</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/docs" className="hover:text-cyber-accent transition-colors flex items-center"><Book size={12} className="mr-2" /> Documentation</Link></li>
              <li><Link to="/api" className="hover:text-cyber-accent transition-colors flex items-center"><Code size={12} className="mr-2" /> API Reference</Link></li>
              <li><Link to="/research" className="hover:text-cyber-accent transition-colors flex items-center"><FileText size={12} className="mr-2" /> Research Papers</Link></li>
              <li><Link to="/status" className="hover:text-cyber-accent transition-colors flex items-center"><Activity size={12} className="mr-2" /> System Status</Link></li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="p-2 bg-slate-800 rounded-lg hover:bg-cyber-accent hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] group"
                  aria-label={link.label}
                >
                  <link.icon size={20} className="group-hover:animate-spin-slow" />
                </a>
              ))}
            </div>
            <div className="text-slate-400 text-sm">
              <p>Questions? Reach us at</p>
              <a href="mailto:support@shield.com" className="text-cyber-accent hover:underline">support@shield.com</a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} SHIELD. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="flex items-center">
              Made with <Heart size={12} className="text-red-500 mx-1 fill-current animate-pulse" /> by SHIELD Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
