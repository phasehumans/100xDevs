import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlueprintMap } from './BlueprintMap';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LOADING_MESSAGES = [
  "Analyzing your prompt...",
  "Assigning tasks to tiny engineers...",
  "Rendering blueprint...",
  "Compiling components...",
  "Calibrating UI engine...",
  "Optimizing serverless functions...",
  "Generating responsive layouts...",
];

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-4">
      {/* Container - constrained width and height */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8 md:gap-12">
        
        {/* Title */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
             <span className="text-sm font-mono text-zinc-400 tracking-[0.2em] uppercase">Phase Humans Active</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Building your vision
          </h2>
        </motion.div>

        {/* The Map - Constrained Size */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="w-full max-w-[800px] relative shadow-[0_0_100px_rgba(59,130,246,0.15)] rounded-2xl overflow-hidden"
        >
           <BlueprintMap className="border-white/10 aspect-video w-full h-auto" />
        </motion.div>

        {/* Dynamic Message */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="h-6 text-zinc-500 font-mono text-sm md:text-base tracking-wide"
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.div>
      </div>
    </div>
  );
};