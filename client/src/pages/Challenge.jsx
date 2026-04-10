import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, XCircle, Award } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Challenge() {
  const navigate = useNavigate();
  const [code, setCode] = useState('function solve() {\n  // Write your code here to print "Hello, World!"\n  console.log("Hello, World!");\n}');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput('Compiling and executing code...');
    
    try {
      // Proxying to our backend judge simulation
      const res = await axios.post('/api/judge/submit', {
        source_code: code,
        language_id: 63 // JavaScript
      });

      setOutput(res.data.stdout || res.data.status.description);

      if (res.data.status.id === 3) {
        // Success
        setShowReward(true);
      }
    } catch (err) {
      setOutput('Error connecting to judge server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
      {/* Left Panel: Instructions */}
      <div className="glass-card rounded-2xl flex flex-col overflow-hidden">
        <div className="bg-[rgba(0,0,0,0.3)] p-4 border-b border-gray-800">
          <span className="text-xs font-bold bg-[rgba(0,243,255,0.1)] text-[--color-neon-blue] px-2 py-1 rounded">EASY</span>
          <h2 className="text-2xl font-bold font-outfit mt-2">Hello, World!</h2>
        </div>
        <div className="p-6 flex-1 overflow-y-auto prose prose-invert">
          <p>Welcome to your first challenge!</p>
          <p>Your task is simple: write a function that prints exactly <code>"Hello, World!"</code> to the console.</p>
          <h3>Expected Output:</h3>
          <pre className="bg-black p-3 rounded-lg border border-gray-800">
            <code>Hello, World!</code>
          </pre>
          <div className="mt-8 flex gap-4">
            <div className="glass-card flex-1 p-4 text-center rounded-xl border border-[--color-neon-blue]">
              <p className="text-sm text-gray-400 font-bold">Reward</p>
              <p className="text-xl font-bold text-[--color-neon-blue]">+50 XP</p>
            </div>
            <div className="glass-card flex-1 p-4 text-center rounded-xl border border-[--color-neon-purple]">
              <p className="text-sm text-gray-400 font-bold">Bonus</p>
              <p className="text-xl font-bold text-[--color-neon-purple]">+5 💎</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="flex flex-col gap-4">
        <div className="glass-card rounded-2xl overflow-hidden flex-1 flex flex-col border border-gray-800 focus-within:border-[--color-neon-blue] transition-colors">
          <div className="bg-[#1e1e1e] px-4 py-2 flex justify-between items-center border-b border-gray-800">
            <span className="text-sm text-gray-400">solve.js</span>
            <button 
              onClick={handleRun}
              disabled={loading}
              className="btn-primary py-1 px-4 text-sm flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Play className="w-4 h-4" />
              )}
              {loading ? 'Running...' : 'Run Code'}
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={setCode}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Output Console */}
        <div className="glass-card h-48 rounded-2xl p-4 flex flex-col border border-gray-800">
          <span className="text-xs text-gray-500 uppercase font-bold mb-2">Console Output</span>
          <pre className="font-mono text-sm text-gray-300 flex-1 overflow-y-auto">
            {output}
          </pre>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showReward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="glass-card p-10 rounded-3xl text-center max-w-sm w-full border border-[--color-neon-green] shadow-[0_0_50px_rgba(10,255,10,0.3)] relative overflow-hidden"
            >
              {/* Confetti effect background */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-[rgba(10,255,10,0.2)] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(10,255,10,0.5)]">
                  <Award className="text-[--color-neon-green] w-12 h-12" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold font-outfit text-white mb-2">Victory!</h2>
                  <p className="text-gray-300">Challenge completed successfully.</p>
                </div>

                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-[--color-neon-blue]">+50</span>
                    <span className="text-xs text-gray-400">XP Earned</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-[--color-neon-purple]">+5</span>
                    <span className="text-xs text-gray-400">Diamonds</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowReward(false);
                    navigate('/dashboard');
                  }}
                  className="w-full btn-primary bg-gradient-to-r from-[--color-neon-green] to-teal-500 py-3 mt-4"
                >
                  Continue Journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
