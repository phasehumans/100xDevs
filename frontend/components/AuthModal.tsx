import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Chrome, X, Mail, ArrowRight } from 'lucide-react';
import { DotMatrixLogo } from './DotMatrixLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-sm bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl p-0 overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20 hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col p-8">
             <div className="mb-8 flex flex-col items-center">
                <DotMatrixLogo className="h-5 text-white mb-6" />
                <h2 className="text-2xl font-bold text-white text-center tracking-tight">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-zinc-500 text-sm mt-2 text-center">
                  {mode === 'login' ? 'Continue your building journey.' : 'Join the autonomous workforce.'}
                </p>
             </div>

             <div className="space-y-3 mb-6">
                <button 
                  onClick={onAuth}
                  className="w-full h-11 bg-[#18181b] text-white border border-white/10 font-medium text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-[#27272a] hover:border-white/20 transition-all duration-200 group"
                >
                  <Chrome className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  Continue with Google
                </button>
                <button 
                  onClick={onAuth}
                  className="w-full h-11 bg-[#18181b] text-white border border-white/10 font-medium text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-[#27272a] hover:border-white/20 transition-all duration-200 group"
                >
                  <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  Continue with GitHub
                </button>
             </div>

             <div className="w-full flex items-center gap-4 mb-6">
               <div className="h-px bg-white/5 flex-1"></div>
               <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Or</span>
               <div className="h-px bg-white/5 flex-1"></div>
             </div>

             <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); onAuth(); }}>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@work.com"
                    className="w-full h-11 bg-[#0c0c0e] border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-11 bg-white text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5"
                >
                   {mode === 'login' ? 'Log In' : 'Sign Up'} <ArrowRight className="w-4 h-4" />
                </button>
             </form>
          </div>
          
          <div className="bg-white/[0.02] p-4 text-center border-t border-white/5">
             <p className="text-xs text-zinc-500">
               {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
               <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-white hover:text-blue-400 transition-colors font-medium ml-1"
               >
                 {mode === 'login' ? 'Sign up' : 'Log in'}
               </button>
             </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};