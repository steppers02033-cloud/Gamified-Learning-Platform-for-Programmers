import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard");
        // Dummy fallback if backend not fully up
        setUsers(Array.from({ length: 15 }).map((_, i) => ({
          _id: i,
          username: `Player_${i + 1}`,
          xp: 5000 - (i * 250),
          level: 25 - i,
          badges: ['First Code']
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(255,200,0,0.1)] mb-4 shadow-[0_0_30px_rgba(255,200,0,0.2)]">
          <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <h2 className="text-4xl font-bold font-outfit mb-2">Global Rankings</h2>
        <p className="text-gray-400">Compete with programmers worldwide.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
        <div className="grid grid-cols-12 gap-4 p-4 bg-[rgba(0,0,0,0.4)] border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">Coder</div>
          <div className="col-span-2 hidden md:block text-center">Level</div>
          <div className="col-span-4 md:col-span-4 text-right">Experience (XP)</div>
        </div>
        
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading rankings...</div>
        ) : (
          <div className="divide-y divide-gray-800/50">
            {users.map((user, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={user._id || idx} 
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-[rgba(255,255,255,0.02)]
                  ${idx === 0 ? 'bg-[rgba(255,200,0,0.05)]' : ''}
                  ${idx === 1 ? 'bg-[rgba(192,192,192,0.05)]' : ''}
                  ${idx === 2 ? 'bg-[rgba(205,127,50,0.05)]' : ''}
                `}
              >
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {idx === 0 ? <Medal className="text-yellow-500" /> :
                   idx === 1 ? <Medal className="text-gray-300" /> :
                   idx === 2 ? <Medal className="text-amber-600" /> :
                   <span className="font-bold text-gray-500">#{idx + 1}</span>}
                </div>
                
                <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-xs border border-gray-600">
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <span className={`font-bold ${idx < 3 ? 'text-white' : 'text-gray-300'}`}>
                      {user.username}
                    </span>
                    <div className="flex gap-1 mt-1 md:hidden">
                      <span className="text-[10px] text-[--color-neon-blue]">Lvl {user.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 hidden md:flex justify-center">
                  <span className="bg-[rgba(0,243,255,0.1)] text-[--color-neon-blue] text-xs font-bold px-2 py-1 rounded">
                    Lvl {user.level}
                  </span>
                </div>
                
                <div className="col-span-4 md:col-span-4 text-right font-bold font-mono text-[--color-neon-purple]">
                  {user.xp.toLocaleString()} XP
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
