import React from 'react';
import { motion } from 'framer-motion';

const agents = [
  { 
    id: 'fe', 
    role: 'Frontend Architect', 
    color: 'bg-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]',
    desc: 'React 19 & Hydration'
  },
  { 
    id: 'be', 
    role: 'Systems Engineer', 
    color: 'bg-blue-500', 
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    desc: 'API & Microservices'
  },
  { 
    id: 'ui', 
    role: 'Interface Designer', 
    color: 'bg-purple-400', 
    glow: 'shadow-[0_0_15px_rgba(192,132,252,0.5)]',
    desc: 'Motion & Systems'
  },
  { 
    id: 'ai', 
    role: 'Neural Specialist', 
    color: 'bg-green-400', 
    glow: 'shadow-[0_0_15px_rgba(74,222,128,0.5)]',
    desc: 'RAG & Inference'
  },
  { 
    id: 'ops', 
    role: 'DevOps Lead', 
    color: 'bg-orange-400', 
    glow: 'shadow-[0_0_15px_rgba(251,146,60,0.5)]',
    desc: 'Kubernetes & CI/CD'
  },
  { 
    id: 'sec', 
    role: 'Security Analyst', 
    color: 'bg-red-400', 
    glow: 'shadow-[0_0_15px_rgba(248,113,113,0.5)]',
    desc: 'Audit & Penetration'
  },
  { 
    id: 'qa', 
    role: 'QA Engineer', 
    color: 'bg-pink-400', 
    glow: 'shadow-[0_0_15px_rgba(244,114,182,0.5)]',
    desc: 'E2E & Regression'
  }
];

export const TeamGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">The Cluster</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Meet the Network</h2>
          <p className="text-zinc-500 mt-2 max-w-lg mx-auto text-sm">
            Each agent is optimized for a specific layer of the development stack.
          </p>
        </div>

        {/* Minimal Dot Layout with Enhanced Styling */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {agents.map((agent, index) => (
            <motion.div 
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative w-[160px] p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex flex-col items-center"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              {/* The Dot */}
              <div className="relative mb-6">
                <div className={`w-3 h-3 rounded-full ${agent.color} ${agent.glow} shadow-lg transition-transform duration-500 group-hover:scale-125 relative z-10`}></div>
                <div className={`absolute inset-0 rounded-full ${agent.color} animate-ping opacity-20`}></div>
                <div className="absolute top-3 left-1.5 w-px h-8 bg-gradient-to-b from-white/10 to-transparent group-hover:h-10 transition-all"></div>
              </div>

              {/* Text Info */}
              <div className="text-center space-y-2 relative z-10">
                <h3 className="text-xs font-bold text-zinc-200 font-mono tracking-tight group-hover:text-white transition-colors">
                  {agent.role}
                </h3>
                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  {agent.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};