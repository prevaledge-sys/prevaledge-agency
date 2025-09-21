
import React, { useState } from 'react';
import Button from '../ui/Button';
import BrainCircuitIcon from '../icons/BrainCircuitIcon';
import { inputClass as formInputClass } from './ui/formStyles';
import UserIcon from '../icons/UserIcon';
import LockIcon from '../icons/LockIcon';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Use environment variables for credentials, with fallback for development.
  // In a real production environment, these fallbacks should not be used.
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Kori@161098';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    // Simulate API call
    setTimeout(() => {
      // Securely check against environment variables
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
      }
      setIsLoggingIn(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 bg-grid-pattern">
       <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-2 bg-slate-900/50 border border-slate-800 rounded-lg shadow-2xl backdrop-blur-lg overflow-hidden animate-fade-in">
        
        {/* Left Branding Column */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-slate-900/30 border-r border-slate-800">
          <BrainCircuitIcon className="w-20 h-20 text-blue-400" />
          <h1 className="text-4xl font-bold mt-4">Prevaledge</h1>
          <p className="text-slate-400 mt-2 text-center">Control Center for Your Digital Presence.</p>
        </div>

        {/* Right Login Form Column */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8 lg:hidden">
              <BrainCircuitIcon className="w-12 h-12 mx-auto text-blue-400 mb-4" />
              <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h2>
          <p className="text-slate-400 text-center mb-8">Please sign in to continue</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${formInputClass.replace('text-sm','')} pl-10`}
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${formInputClass.replace('text-sm','')} pl-10`}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            {error && <p role="alert" className="text-red-400 text-sm text-center">{error}</p>}
            <div>
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
       </div>
    </div>
  );
};

export default AdminLogin;
