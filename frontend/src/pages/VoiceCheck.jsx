import React, { useState } from 'react';
import client from '../services/api';
import { Upload, Mic, Volume2, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceCheck = () => {
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
      const response = await client.post('/check_audio', formData);
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
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Mic size={32} className="text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Voice Clone Detection</h1>
          <p className="text-slate-400">Identify synthetic speech and AI-cloned voices</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="cyber-card md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6" onDragEnter={handleDrag}>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive ? 'border-purple-500 bg-purple-500/5' : 'border-slate-700 hover:border-purple-500/50'
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
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <div className={`p-4 rounded-full mb-4 transition-colors ${file ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                  {file ? <Volume2 size={32} /> : <Upload size={32} />}
                </div>
                <span className="text-lg font-medium text-slate-200">
                  {file ? file.name : 'Click to upload or drag audio here'}
                </span>
                <span className="text-sm text-slate-500 mt-2">
                  Supported formats: MP3, WAV, FLAC
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`cyber-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading || !file}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Analyzing Audio...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Start Analysis</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="cyber-card bg-purple-500/5 border-purple-500/20">
            <h3 className="font-bold text-purple-400 mb-2 flex items-center"><Shield size={16} className="mr-2"/> How it works</h3>
            <p className="text-sm text-slate-400">We analyze spectral features, breathing patterns, and digital signatures to distinguish human voice from AI.</p>
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

export default VoiceCheck;
