import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Server, Cpu } from 'lucide-react';

const SystemStatus = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLastUpdated(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    { name: "Video Detection API", status: "operational", uptime: "99.9%" },
    { name: "Audio Analysis Engine", status: "operational", uptime: "99.8%" },
    { name: "Image Forensics", status: "operational", uptime: "99.9%" },
    { name: "Text Verification", status: "operational", uptime: "100%" },
    { name: "Database Cluster", status: "operational", uptime: "99.99%" },
    { name: "User Authentication", status: "operational", uptime: "100%" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
            <Activity size={48} className="text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">System Status</h1>
          <p className="text-xl text-slate-400">
            Current operational status of all AI Guardian services.
          </p>
        </motion.div>

        {/* Global Status Banner */}
        <motion.div variants={itemVariants} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 flex items-center justify-center gap-4">
          <CheckCircle className="text-emerald-400" size={32} />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">All Systems Operational</h2>
            <p className="text-emerald-400/80 text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="cyber-card p-0 overflow-hidden">
          <div className="grid divide-y divide-slate-800">
            {services.map((service, index) => (
              <div key={index} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  {index < 4 ? <Cpu className="text-slate-500" size={20} /> : <Server className="text-slate-500" size={20} />}
                  <span className="font-medium text-slate-200">{service.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-sm text-slate-500">
                    Uptime: <span className="text-slate-300">{service.uptime}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Operational</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-card text-center py-8">
            <div className="text-3xl font-bold text-white mb-2">34ms</div>
            <div className="text-sm text-slate-400">Avg. API Latency</div>
          </div>
          <div className="cyber-card text-center py-8">
            <div className="text-3xl font-bold text-white mb-2">99.98%</div>
            <div className="text-sm text-slate-400">Global Uptime</div>
          </div>
          <div className="cyber-card text-center py-8">
            <div className="text-3xl font-bold text-white mb-2">0</div>
            <div className="text-sm text-slate-400">Active Incidents</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SystemStatus;
