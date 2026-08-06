import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, user, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter email and password', 'warning');
      return;
    }
    const loggedUser = {
      name: mode === 'signup' ? name || 'Robotics Innovator' : 'Aarav Sharma',
      email,
      isLoggedIn: true
    };
    setUser(loggedUser);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white  rounded-3xl shadow-2xl border border-slate-200  overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold font-heading">
              {user ? 'My NavoYantra Account' : mode === 'login' ? 'Sign In to Account' : 'Create Student / School Account'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {user ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600   flex items-center justify-center text-2xl font-bold font-heading mx-auto">
              {user.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 ">{user.name}</h4>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50  text-xs text-slate-600  space-y-1">
              <p>✔ Active Member: NavoMaker Student Club</p>
              <p>✔ Lifetime Video Tutorial Access Unlocked</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-700  block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700  block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="aarav@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700  block mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50  border border-slate-200  text-xs font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-transform hover:scale-105"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs font-semibold text-blue-600  hover:underline"
              >
                {mode === 'login' ? "Don't have an account? Sign up here" : "Already registered? Sign in"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
