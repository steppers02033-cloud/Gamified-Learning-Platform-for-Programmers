import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, CheckCircle, Lock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const modules = [
  { id: 1, title: 'Basics of Programming', status: 'completed', tasks: 3 },
  { id: 2, title: 'Variables & Data Types', status: 'completed', tasks: 4 },
  { id: 3, title: 'Functions & Scope', status: 'active', tasks: 5 },
  { id: 4, title: 'Arrays & Loops', status: 'locked', tasks: 4 },
  { id: 5, title: 'Objects & Classes', status: 'locked', tasks: 6 }
];

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-outfit mb-4">Journey Map</h2>
        <p className="text-gray-400">Complete modules to unlock new coding powers.</p>
      </div>

      <div className="relative border-l-4 border-gray-800 ml-6 md:ml-12 space-y-12 pb-12">
        {modules.map((mod, i) => (
          <div key={mod.id} className="relative pl-8 md:pl-12">
            {/* Timeline Node */}
            <div className={`absolute top-0 -left-[26px] w-12 h-12 rounded-full border-4 flex items-center justify-center
              ${mod.status === 'completed' ? 'bg-[--color-neon-blue] border-[--color-dark-bg] shadow-[0_0_15px_rgba(0,243,255,0.6)]' : ''}
              ${mod.status === 'active' ? 'bg-[--color-dark-card] border-[--color-neon-green] shadow-[0_0_15px_rgba(10,255,10,0.4)]' : ''}
              ${mod.status === 'locked' ? 'bg-gray-800 border-[--color-dark-bg]' : ''}
            `}>
              {mod.status === 'completed' && <CheckCircle className="text-black w-6 h-6" />}
              {mod.status === 'active' && <Play className="text-[--color-neon-green] w-5 h-5 ml-1" />}
              {mod.status === 'locked' && <Lock className="text-gray-500 w-5 h-5" />}
            </div>

            <motion.div 
              whileHover={mod.status !== 'locked' ? { scale: 1.02 } : {}}
              className={`glass-card p-6 rounded-2xl transition-all duration-300
                ${mod.status === 'active' ? 'neon-border' : ''}
                ${mod.status === 'locked' ? 'opacity-50' : 'cursor-pointer'}
              `}
              onClick={() => {
                if (mod.status !== 'locked') navigate('/challenge/'+mod.id)
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Chapter {mod.id}</span>
                <span className="text-xs bg-[calc(var(--color-dark-card)*1.2)] px-2 py-1 rounded text-gray-300">
                  {mod.tasks} Quests
                </span>
              </div>
              <h3 className={`text-2xl font-bold font-outfit mb-3 ${mod.status === 'active' ? 'neon-text-green' : ''}`}>
                {mod.title}
              </h3>
              
              {mod.status === 'active' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[--color-neon-green]">2/5 Completed</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-[--color-neon-green] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <button className="mt-4 btn-primary w-full md:w-auto text-sm py-2">Continue Quest</button>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
