import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Challenge from './pages/Challenge';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen bg-[--color-dark-bg] text-white selection:bg-[--color-neon-blue] selection:text-black">
      <nav className="glass-card flex items-center justify-between p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--color-neon-blue] to-[--color-neon-purple] flex items-center justify-center font-bold">
            &lt;/&gt;
          </div>
          <h1 className="text-xl font-bold font-outfit tracking-wider">Dev<span className="neon-text-blue">Quest</span></h1>
        </div>
        <div className="flex gap-4 items-center font-semibold">
          <a href="/dashboard" className="hover:text-[--color-neon-blue] transition-colors">Dashboard</a>
          <a href="/leaderboard" className="hover:text-[--color-neon-purple] transition-colors">Leaderboard</a>
          <a href="/profile" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer flex items-center justify-center border-2 border-[--color-neon-blue]">
            👤
          </a>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-4 py-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
