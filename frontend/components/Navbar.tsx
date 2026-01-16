import React, { useState, useRef, useEffect } from 'react';
import { Github, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { DotMatrixLogo } from './DotMatrixLogo';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLoginClick, onLogoClick, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock user data matching the reference
  const user = {
    name: "Chetan Sonawane",
    email: "chetan@phasehumans.app",
    initials: "CS"
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Reduced size */}
          <div className="flex items-center cursor-pointer group" onClick={onLogoClick}>
            <DotMatrixLogo className="h-4 text-white/90 group-hover:text-white transition-colors" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <a 
              href="#" 
              className="hidden md:flex text-zinc-400 hover:text-white transition-all hover:scale-110 hover:rotate-3 duration-300 p-2 hover:bg-white/5 rounded-full"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {!isLoggedIn ? (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={onLoginClick} 
                className="font-bold text-xs tracking-wide px-6 rounded-full transition-colors duration-200"
              >
                START BUILDING
              </Button>
            ) : (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                    {user.initials}
                  </div>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-[#09090b] border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden ring-1 ring-black/50 backdrop-blur-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                      </div>
                      
                      <div className="p-1">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                          <User className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                          Profile
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                          <Settings className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                          Settings
                        </button>
                      </div>

                      <div className="p-1 border-t border-white/5">
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};