import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, LineChart, ShoppingBag, Terminal, Image as ImageIcon, FileText, Plus } from 'lucide-react';
import { NoiseBackground } from './ui/noise-background';

interface HeroProps {
  onGenerate: (prompt: string) => void;
}

const PLACEHOLDERS = [
  "Ask Phase Humans to create a dashboard to track crypto...",
  "Ask Phase Humans to build a landing page for a SaaS...",
  "Ask Phase Humans to design a portfolio for a photographer...",
  "Ask Phase Humans to prototype an e-commerce store...",
];

export const Hero: React.FC<HeroProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onGenerate(prompt);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const templates = [
    { name: 'SaaS Landing Page', icon: LayoutTemplate },
    { name: 'Crypto Dashboard', icon: LineChart },
    { name: 'Portfolio', icon: Terminal },
    { name: 'E-commerce Store', icon: ShoppingBag },
  ];

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-[#050505]">
      
      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium text-zinc-400 mb-8 font-mono tracking-widest uppercase hover:bg-white/[0.05] transition-colors cursor-default"
        >
          Humans. Technology.
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Your Idea.<br />
          <span className="text-zinc-500">Built by Phase Humans.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto"
        >
          The world's first autonomous pixel workforce. <br/>
          They code, design, and deploy while you watch.
        </motion.p>

        {/* Input Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto w-full relative group"
        >
          <form 
            onSubmit={handleSubmit} 
            className="relative bg-[#09090b] rounded-[24px] border border-white/10 shadow-2xl overflow-visible transition-all duration-300 hover:border-white/20 ring-1 ring-white/5"
          >
            <div className="relative">
              {/* Animated Placeholder */}
              <AnimatePresence mode='wait'>
                {prompt === '' && (
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-5 left-5 text-lg font-light text-zinc-500 pointer-events-none truncate max-w-[90%]"
                  >
                    {PLACEHOLDERS[placeholderIndex]}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Text Area */}
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent border-none text-zinc-100 focus:ring-0 resize-none h-28 p-5 text-lg font-light leading-relaxed focus:outline-none relative z-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            {/* Bottom Controls */}
            <div className="flex items-center justify-between px-3 pb-3 mt-1">
              <div className="flex items-center gap-2 relative z-20">
                
                {/* Plus Menu Button */}
                <div className="relative" ref={menuRef}>
                  <button 
                    type="button" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200 ${isMenuOpen ? 'bg-white/10 text-white rotate-45' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  {/* Styled Dropdown */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-12 left-0 bg-[#121214] border border-white/[0.08] rounded-xl p-1.5 shadow-2xl min-w-[180px] flex flex-col gap-0.5 backdrop-blur-xl z-50 ring-1 ring-black/50"
                      >
                         <button className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100 rounded-lg transition-all text-left w-full group">
                           <ImageIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                           <span className="font-mono tracking-wide">Upload Image</span>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100 rounded-lg transition-all text-left w-full group">
                           <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                           <span className="font-mono tracking-wide">Upload File</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              <div className="flex items-center gap-4">
                {/* Shift + Enter Hint */}
                <div className="hidden md:flex items-center gap-1.5 text-[10px] font-medium text-zinc-600 font-mono select-none">
                  <span className="bg-white/5 border border-white/5 rounded px-1.5 py-0.5 min-w-[32px] text-center">Shift</span>
                  <span>+</span>
                  <span className="bg-white/5 border border-white/5 rounded px-1.5 py-0.5 min-w-[32px] text-center">Enter</span>
                  <span className="opacity-70 ml-1">new line</span>
                </div>

                {/* Generate Button with Noise Background */}
                <NoiseBackground
                  containerClassName="w-fit p-1 rounded-full mx-auto"
                  gradientColors={[
                    "#1e1e1e",
                    "#3b82f6",
                    "#000000",
                  ]}
                  speed={0.05}
                >
                  <button 
                      type="submit"
                      className="relative z-10 h-full w-full cursor-pointer rounded-full bg-white px-5 py-2 text-black font-semibold text-xs transition-all duration-200 hover:bg-zinc-200"
                  >
                      Generate
                  </button>
                </NoiseBackground>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Template Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {templates.map((t) => (
            <button
              key={t.name}
              onClick={() => onGenerate(t.name)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs text-zinc-400 hover:text-white"
            >
              <t.icon className="w-3 h-3 group-hover:text-blue-400 transition-colors" />
              {t.name}
            </button>
          ))}
        </motion.div>

      </div>
    </div>
  );
};