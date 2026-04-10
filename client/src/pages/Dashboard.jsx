import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Diamond, Star, Trophy, ArrowRight, BookOpen, Code, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'Player_1',
    xp: 2450,
    level: 12,
    diamonds: 45,
    streak: 5,
    badges: ['First Code', '7-day streak', 'Bug Squasher']
  });

  const nextLevelXP = user.level * 200;
  const progressPercent = (user.xp % 200) / 200 * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[--color-neon-blue] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
          <div className="relative">
            <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="var(--color-neon-blue)" strokeWidth="8" 
                strokeDasharray="283" strokeDashoffset={283 - (283 * progressPercent) / 100} 
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 0 4px var(--color-neon-blue))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-400">LVL</span>
              <span className="text-3xl font-bold font-outfit neon-text-blue">{user.level}</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-outfit mb-1">Welcome back, {user.username}!</h2>
            <p className="text-gray-400">{user.xp} XP total • {Math.round(200 - (user.xp % 200))} XP to Level {user.level + 1}</p>
          </div>
        </div>

        <div className="flex gap-4 z-10 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="glass-card flex items-center gap-3 py-2 px-4 rounded-xl neon-border">
            <Flame className="text-orange-500 w-6 h-6 animate-pulse" />
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Streak</p>
              <p className="text-xl font-bold font-outfit">{user.streak}</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-3 py-2 px-4 rounded-xl border border-[--color-neon-purple] shadow-[inset_0_0_10px_rgba(188,19,254,0.1)]">
            <Diamond className="text-[--color-neon-purple] w-6 h-6" />
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Diamonds</p>
              <p className="text-xl font-bold font-outfit">{user.diamonds}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold font-outfit flex items-center gap-2">
            <PlayCircle className="text-[--color-neon-green]" /> Continue Quest
          </h3>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-2xl border-l-4 border-l-[--color-neon-green] cursor-pointer group"
            onClick={() => navigate('/learn')}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-[--color-neon-green] bg-[rgba(10,255,10,0.1)] px-2 py-1 rounded">IN PROGRESS</span>
                <h4 className="text-xl font-bold mt-2">Functions & Scope</h4>
                <p className="text-gray-400 text-sm mt-1">Master passing data between blocks of code.</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] p-3 rounded-xl group-hover:bg-[--color-neon-green] group-hover:text-black transition-colors">
                <ArrowRight />
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2 shadow-inner">
              <div className="bg-[--color-neon-green] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-right text-gray-400">45% Completed</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <motion.div 
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)' }}
              className="glass-card p-6 rounded-2xl cursor-pointer"
              onClick={() => navigate('/challenge/1')}
            >
              <Code className="text-[--color-neon-blue] w-8 h-8 mb-3" />
              <h4 className="text-lg font-bold mb-1">Daily Challenge</h4>
              <p className="text-sm text-gray-400 mb-4">Fix the sorting bug to earn double XP today.</p>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[--color-neon-blue]">+100 XP</span>
                <span className="text-[--color-neon-purple]">+10 💎</span>
              </div>
            </motion.div>
             <motion.div 
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(188, 19, 254, 0.2)' }}
              className="glass-card p-6 rounded-2xl cursor-pointer"
              onClick={() => navigate('/learn')}
            >
              <BookOpen className="text-[--color-neon-purple] w-8 h-8 mb-3" />
              <h4 className="text-lg font-bold mb-1">Concept Library</h4>
              <p className="text-sm text-gray-400 mb-4">Review unlocked concepts and notes.</p>
              <div className="text-right">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">12 Unlocked</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold font-outfit mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" /> Badges Earned
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {user.badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group cursor-help relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center p-[2px] shadow-[0_0_15px_rgba(255,200,0,0.3)]">
                    <div className="w-full h-full bg-[#151828] rounded-full flex items-center justify-center relative overflow-hidden">
                      <Star className="text-yellow-500 w-6 h-6" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.2)] to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out -translate-x-full"></div>
                    </div>
                  </div>
                  <span className="text-[10px] text-center font-bold text-gray-400">{badge}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 opacity-30">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center">
                  <Lock className="text-gray-500 w-5 h-5" />
                </div>
                <span className="text-[10px] text-center font-bold">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
