import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, LogOut, LogIn, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 group ${
        isActive 
          ? 'text-blue-600 dark:text-white' 
          : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 bg-blue-100 dark:bg-cyber-accent/20 rounded-md shadow-lg shadow-blue-500/20 dark:shadow-[0_0_10px_rgba(56,189,248,0.3)]"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center space-x-2 group-hover:text-shadow-glow">
        <Icon size={18} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-cyber-accent' : 'group-hover:text-blue-600 dark:group-hover:text-cyber-accent'}`} />
        <span className={isActive ? 'font-medium' : ''}>{label}</span>
      </span>
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-cyber-primary dark:to-blue-400 font-bold text-xl hover:opacity-80 transition-opacity group">
              <Shield size={24} className="text-blue-600 dark:text-cyber-primary group-hover:animate-pulse-glow" />
              <span className="group-hover:text-shadow-glow transition-all">SHIELD</span>
            </Link>
            {user && (
              <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <NavLink to="/about" icon={Info} label="About" />
            {user ? (
              <>
                <Link to="/user" className="flex items-center space-x-2 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyber-accent hover:bg-slate-100 dark:hover:bg-cyber-light transition-colors" title="User Profile">
                   <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-cyber-accent flex items-center justify-center text-white dark:text-black text-xs font-bold">
                     {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                   </div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
