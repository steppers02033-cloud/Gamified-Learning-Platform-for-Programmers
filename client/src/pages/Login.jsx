import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success
    localStorage.setItem('user', JSON.stringify({
      username: 'Player_1',
      xp: 1250,
      level: 12,
      diamonds: 45,
      streak: 5,
      badges: ['First Code', '7-day streak']
    }));
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md neon-border relative overflow-hidden"
      >
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[--color-neon-purple] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-[--color-neon-blue] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

        <h2 className="text-3xl font-bold font-outfit text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Join the Quest'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full bg-[#0d0e15] border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[--color-neon-blue] transition-colors"
                required
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-[#0d0e15] border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[--color-neon-blue] transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#0d0e15] border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[--color-neon-blue] transition-colors"
              required
            />
          </div>
          
          <button type="submit" className="w-full btn-primary text-xl mt-4 py-3">
            {isLogin ? 'Enter System' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <span 
            className="neon-text-blue cursor-pointer font-bold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
