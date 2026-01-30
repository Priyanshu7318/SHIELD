import React, { useState } from 'react';
import client from '../services/api';
import { FileText, Shield, Wand2, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TextCheck = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('text', text);
      const response = await client.post('/check_text', formData);
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
        <div className="p-3 bg-orange-500/20 rounded-full">
          <FileText size={32} className="text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">AI Text Detection</h1>
          <p className="text-slate-400">Detect LLM-generated content and synthetic writing styles</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="cyber-card md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-slate-400">Enter Text</label>
                <button 
                    type="button" 
                    onClick={() => setText('')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                >
                    Clear
                </button>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="cyber-input h-48 w-full font-mono text-sm resize-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Paste the suspicious text here to analyze (min 50 characters recommended)..."
                required
              />
              <p className="text-right text-xs text-slate-500 mt-2">{text.length} characters</p>
            </div>
            
            <button 
              type="submit" 
              className={`cyber-button w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  <span>Analyze Text</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="cyber-card bg-orange-500/5 border-orange-500/20">
            <h3 className="font-bold text-orange-400 mb-2 flex items-center"><Shield size={16} className="mr-2"/> Model Info</h3>
            <p className="text-sm text-slate-400">Powered Advanced NLP transformers to identify perplexity and burstiness typical of AI generation.</p>
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
              
              <div className="grid grid-cols-2 gap-8 mt-4">
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

export default TextCheck;
