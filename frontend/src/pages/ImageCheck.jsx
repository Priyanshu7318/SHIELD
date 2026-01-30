import React, { useState } from 'react';
import client from '../services/api';
import { Upload, Image, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageCheck = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await client.post('/check_image', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || 
                      (err.response ? `Server Error: ${err.response.status} - ${JSON.stringify(err.response.data)}` : 'Network Error: Check if backend is running');
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-pink-500/20 rounded-full">
          <Image size={32} className="text-pink-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">Image Deepfake Detection</h1>
          <p className="text-slate-400">Analyze images for AI-generated artifacts and manipulations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="cyber-card md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6" onDragEnter={handleDrag}>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive ? 'border-cyber-accent bg-cyber-accent/5' : 'border-slate-700 hover:border-cyber-accent/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <div className={`p-4 rounded-full mb-4 transition-colors ${file ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                  {file ? <CheckCircle size={32} /> : <Upload size={32} />}
                </div>
                <span className="text-lg font-medium text-slate-200">
                  {file ? file.name : 'Click to upload or drag image here'}
                </span>
                <span className="text-sm text-slate-500 mt-2">
                  Supported formats: JPG, PNG, WEBP (Max 10MB)
                </span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                loading || !file
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:shadow-pink-500/25 text-white'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Image...
                </span>
              ) : 'Analyze Image'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="cyber-card bg-slate-800/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="mr-2 text-pink-400" size={20} />
              Detection Features
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Generative AI artifacts detection
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Face manipulation analysis
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Metadata consistency check
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                StyleGAN fingerprinting
              </li>
            </ul>
          </div>
        </div>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`cyber-card border-l-4 ${
          result.result.includes('Fake') || result.result.includes('AI') 
            ? 'border-l-red-500 shadow-red-500/20' 
            : result.result.includes('Error')
              ? 'border-l-orange-500 shadow-orange-500/20'
              : 'border-l-green-500 shadow-green-500/20'
        }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center">
                {result.result.includes('Fake') ? (
                  <AlertTriangle className="text-red-500 mr-2" />
                ) : result.result.includes('Error') ? (
                  <AlertTriangle className="text-orange-500 mr-2" />
                ) : (
                  <CheckCircle className="text-green-500 mr-2" />
                )}
                Analysis Result
              </h3>
              <p className="text-slate-400 text-sm mb-4">Completed successfully</p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Verdict</p>
                  <p className={`text-2xl font-bold ${
                    result.result.includes('Fake') ? 'text-red-500' : result.result.includes('Error') ? 'text-orange-500' : 'text-green-500'
                  }`}>{result.result}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Confidence Score</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-white mr-2">{(result.confidence * 100).toFixed(1)}%</p>
                    <div className="h-2 w-24 bg-slate-700 rounded-full mb-2 overflow-hidden">
                      <div 
                        className={`h-full ${result.result.includes('Fake') ? 'bg-red-500' : result.result.includes('Error') ? 'bg-orange-500' : 'bg-green-500'}`} 
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageCheck;