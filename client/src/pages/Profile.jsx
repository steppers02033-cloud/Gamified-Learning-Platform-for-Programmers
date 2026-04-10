import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-r from-[--color-neon-blue] to-[--color-neon-purple] opacity-20"></div>
        
        <div className="relative w-32 h-32 rounded-full mt-8 mb-4 border-4 border-[--color-dark-card] shadow-[0_0_20px_rgba(0,243,255,0.4)] overflow-hidden bg-gray-800 flex items-center justify-center">
          <User className="w-16 h-16 text-gray-500" />
        </div>
        
        <h2 className="text-3xl font-bold font-outfit">Player_1</h2>
        <p className="text-gray-400">Joined April 2024</p>
        
        <div className="flex gap-4 mt-8 w-full">
          <div className="flex-1 bg-black/40 rounded-xl p-4 border border-gray-800 border-b-2 border-b-[--color-neon-blue]">
            <p className="text-xs text-gray-500 uppercase font-bold">Total XP</p>
            <p className="text-2xl font-bold">2,450</p>
          </div>
          <div className="flex-1 bg-black/40 rounded-xl p-4 border border-gray-800 border-b-2 border-b-[--color-neon-purple]">
            <p className="text-xs text-gray-500 uppercase font-bold">Diamonds</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="flex-1 bg-black/40 rounded-xl p-4 border border-gray-800 border-b-2 border-b-orange-500">
            <p className="text-xs text-gray-500 uppercase font-bold">Max Streak</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors border border-red-500/30" onClick={handleLogout}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
            <LogOut />
          </div>
          <span className="font-bold text-red-400">Logout of DevQuest</span>
        </div>
      </div>
    </div>
  );
}
