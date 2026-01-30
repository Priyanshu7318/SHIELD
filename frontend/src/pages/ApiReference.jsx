import React from 'react';
import { motion } from 'framer-motion';
import { Key, Globe } from 'lucide-react';

const ApiReference = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <Globe size={48} className="text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">API Reference</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Integrate AI Guardian's detection capabilities directly into your applications.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="cyber-card bg-slate-800/80">
          <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
            <Key className="text-yellow-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white">Authentication</h2>
              <p className="text-sm text-slate-400">All API requests require a Bearer Token in the header.</p>
            </div>
          </div>
          <code className="block bg-slate-950 p-4 rounded text-green-400 font-mono text-sm">
            Authorization: Bearer &lt;your_jwt_token&gt;
          </code>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Endpoints</h2>
          
          {/* Endpoint 1 */}
          <motion.div variants={itemVariants} className="cyber-card border-l-4 border-l-blue-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                <code className="text-blue-300 font-mono">/api/v1/detect/video</code>
              </div>
              <span className="text-slate-400 text-sm">Analyze video for deepfakes</span>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Request Body (Multipart/Form-Data)</h4>
                <div className="bg-slate-950 p-3 rounded text-slate-300 text-sm font-mono">
                  file: binary_video_file (.mp4, .mov)
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Response (JSON)</h4>
                <pre className="bg-slate-950 p-3 rounded text-green-400 text-xs font-mono overflow-x-auto">
{`{
  "id": "req_12345",
  "status": "completed",
  "result": {
    "is_fake": true,
    "confidence": 0.98,
    "details": "Face manipulation detected at frames 45-120"
  },
  "timestamp": "2023-10-27T10:00:00Z"
}`}
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Endpoint 2 */}
          <motion.div variants={itemVariants} className="cyber-card border-l-4 border-l-purple-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                <code className="text-purple-300 font-mono">/api/v1/detect/audio</code>
              </div>
              <span className="text-slate-400 text-sm">Check audio for voice cloning</span>
            </div>
            <div className="space-y-4">
               <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Request Body (Multipart/Form-Data)</h4>
                <div className="bg-slate-950 p-3 rounded text-slate-300 text-sm font-mono">
                  file: binary_audio_file (.mp3, .wav)
                </div>
              </div>
            </div>
          </motion.div>

           {/* Endpoint 3 */}
           <motion.div variants={itemVariants} className="cyber-card border-l-4 border-l-emerald-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                <code className="text-emerald-300 font-mono">/api/v1/detect/text</code>
              </div>
              <span className="text-slate-400 text-sm">Analyze text content</span>
            </div>
            <div className="space-y-4">
               <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Request Body (JSON)</h4>
                <div className="bg-slate-950 p-3 rounded text-slate-300 text-sm font-mono">
                  {`{ "text": "Content to analyze..." }`}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApiReference;
