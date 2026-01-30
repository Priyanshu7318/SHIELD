import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-cyber-accent opacity-20">404</h1>
      <h2 className="text-3xl font-bold -mt-12 mb-6">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved to a secure location.
      </p>
      <Link to="/" className="cyber-button">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
