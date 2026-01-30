import React, { useEffect, useState } from 'react';
import client from '../services/api';
import { Activity, FileText, Mic, Video, Image, Calendar, BarChart2, PieChart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie, Legend } from 'recharts';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMilSecDur = duration * 1000;
    let incrementTime = (totalMilSecDur / end) * 1000; // time per increment is too small for large numbers
    
    // Adjust for large numbers to avoid performance issues
    let step = 1;
    if (end > 100) {
      step = Math.floor(end / 50);
      incrementTime = (totalMilSecDur / (end / step));
    }

    const timer = setInterval(() => {
      start += step;
      if (start > end) start = end;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, fake: 0, real: 0, safetyScore: 100 });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChartData = async () => {
        try {
            const response = await client.get(`/dashboard/chart-data?type=All`);
            const backendData = response.data;

            // Generate last 7 days to ensure continuous X-axis
            const last7Days = [...Array(7)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d.toISOString().split('T')[0];
            }).reverse();

            const mergedData = last7Days.map(dateStr => {
                const found = backendData.find(d => d.name === dateStr);
                return {
                    name: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
                    date: dateStr,
                    Total: found ? found.Total : 0,
                    Fake: found ? found.Fake : 0,
                    Real: found ? found.Real : 0
                };
            });

            setChartData(mergedData);
        } catch (err) {
            console.error("Failed to fetch chart data", err);
        }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsResponse, statsResponse] = await Promise.all([
          client.get('/dashboard/logs'),
          client.get('/dashboard/stats')
        ]);

        const allLogs = Array.isArray(logsResponse.data) ? logsResponse.data : [];
        const backendStats = statsResponse.data || { total: 0, fake: 0, real: 0, safetyScore: 100 };

        // Use backend stats directly
        setStats(backendStats);

        // Sort by timestamp descending
        allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(allLogs);

        // Prepare Pie Data using backend stats
        const pieChartData = [
          { name: 'Fake / AI', value: backendStats.fake || 0, color: '#ef4444' },
          { name: 'Real', value: backendStats.real || 0, color: '#22c55e' }
        ];
        setPieData(pieChartData);

        // Prepare Type Breakdown Data
        const types = ['video', 'audio', 'text', 'image'];
        const typeStats = types.map(type => {
            const typeLogs = allLogs.filter(l => l.request_type === type);
            const typeFake = typeLogs.filter(l => l.result.includes('Fake') || l.result.includes('AI')).length;
            const typeReal = typeLogs.length - typeFake;
            return {
                name: type.charAt(0).toUpperCase() + type.slice(1),
                Total: typeLogs.length,
                Fake: typeFake,
                Real: typeReal
            };
        });
        setTypeData(typeStats);

      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        // Set safe defaults on error
        setLogs([]);
        setStats({ total: 0, fake: 0, real: 0, safetyScore: 100 });
      }
    };

    fetchData();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={20} />;
      case 'audio': return <Mic size={20} />;
      case 'text': return <FileText size={20} />;
      case 'image': return <Image size={20} />;
      default: return <Activity size={20} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-slate-500 dark:text-gray-400">Real-time deepfake detection analytics</p>
        </div>
        
        {user && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center space-x-4"
          >
            <div className="bg-purple-500/20 p-3 rounded-full">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-semibold">{user.username}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{user.email}</p>
              <p className="text-xs text-slate-500 dark:text-gray-500">ID: {user.id}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Access Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link to="/check-video" className="cyber-card p-4 hover:bg-slate-800/80 transition-colors flex items-center space-x-4 border border-purple-500/30 hover:border-purple-500 group">
          <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
            <Video className="text-purple-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Video Check</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Deepfake detection</p>
          </div>
        </Link>
        
        <Link to="/check-image" className="cyber-card p-4 hover:bg-slate-800/80 transition-colors flex items-center space-x-4 border border-pink-500/30 hover:border-pink-500 group">
          <div className="bg-pink-500/20 p-3 rounded-lg group-hover:bg-pink-500/30 transition-colors">
            <Image className="text-pink-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Image Check</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI Image Analysis</p>
          </div>
        </Link>

        <Link to="/check-voice" className="cyber-card p-4 hover:bg-slate-800/80 transition-colors flex items-center space-x-4 border border-blue-500/30 hover:border-blue-500 group">
          <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <Mic className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Voice Check</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Audio Analysis</p>
          </div>
        </Link>

        <Link to="/check-text" className="cyber-card p-4 hover:bg-slate-800/80 transition-colors flex items-center space-x-4 border border-orange-500/30 hover:border-orange-500 group">
          <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors">
            <FileText className="text-orange-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Text Check</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">LLM Detection</p>
          </div>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="flex items-center space-x-2 mb-4">
        <BarChart2 className="text-cyber-primary" size={20} />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics Overview</h2>
        <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">All Time</span>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <motion.div variants={itemVariants} className="cyber-card min-h-[300px]">
          <h2 className="text-xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
            <BarChart2 className="mr-2 text-cyber-primary" /> Detection Trends (Last 7 Days)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="Total" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="Fake" stroke="#ef4444" fillOpacity={1} fill="url(#colorFake)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Type Breakdown Bar Chart */}
        <motion.div variants={itemVariants} className="cyber-card min-h-[300px]">
          <h2 className="text-xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
            <Activity className="mr-2 text-cyber-primary" /> Threat Breakdown by Type
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  cursor={{ fill: '#1e293b', opacity: 0.5 }}
                />
                <Legend />
                <Bar dataKey="Total" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="Real" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <motion.div variants={itemVariants} className="cyber-card min-h-[300px]">
          <h2 className="text-xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
            <PieChart className="mr-2 text-cyber-primary" /> Content Analysis Ratio
          </h2>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </RePieChart>
            </ResponsiveContainer>
            {/* Center text for Pie Chart */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-4">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Scans</p>
            </div>
          </div>
        </motion.div>

        {/* Scan Distribution by Type Donut Chart */}
        <motion.div variants={itemVariants} className="cyber-card min-h-[300px]">
          <h2 className="text-xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
            <PieChart className="mr-2 text-cyber-primary" /> Scan Distribution by Type
          </h2>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="Total"
                >
                  {typeData.map((entry, index) => {
                     let color = '#8884d8';
                     if (entry.name === 'Video') color = '#a855f7';
                     else if (entry.name === 'Audio') color = '#3b82f6';
                     else if (entry.name === 'Image') color = '#ec4899';
                     else if (entry.name === 'Text') color = '#f97316';
                     return <Cell key={`cell-${index}`} fill={color} stroke="none" />;
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </RePieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-4">
               <span className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</span>
               <p className="text-xs text-slate-500 dark:text-slate-400">Total Scans</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="cyber-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
            <Calendar className="mr-2 text-cyber-primary" /> Recent Activity
          </h2>
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">
            All Time
          </div>
        </div>

        <div className="overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900/90 backdrop-blur z-10">
              <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-3">Type</th>
                <th className="p-3">Result</th>
                <th className="p-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-200 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="p-3 flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      log.request_type === 'video' ? 'bg-purple-500/10 text-purple-400' :
                      log.request_type === 'audio' ? 'bg-blue-500/10 text-blue-400' :
                      log.request_type === 'image' ? 'bg-pink-500/10 text-pink-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {getIcon(log.request_type)}
                    </div>
                    <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{log.request_type}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${log.result.includes('Fake') || log.result.includes('AI')
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-500 text-xs">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-slate-500 italic">
                    No activity recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;

