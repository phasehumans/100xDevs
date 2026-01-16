import React from 'react';
import { BlueprintMap } from './BlueprintMap';
import { motion } from 'framer-motion';
import { Cpu, Activity, Zap } from 'lucide-react';

export const WorkforceSection: React.FC = () => {
  return (
    <section className="py-24 bg-black relative border-y border-white/5 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[128px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center mb-16">
          <div className="md:w-1/2">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               <span className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-6">
                 <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                 Autonomous Pixel Workforce
               </span>
               
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                 Real agents. <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">Working in real-time.</span>
               </h2>
               
               <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
                 Watch as our specialized AI agents collaborate to build your software. From backend architecture to pixel-perfect UI adjustments, Phase Humans handle the complexity while you focus on the vision.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="group bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-2xl shadow-black">
                   <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/10 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5 text-blue-400" />
                   </div>
                   <h4 className="text-white font-medium mb-2 tracking-wide">Multi-Agent System</h4>
                   <p className="text-sm text-zinc-500 leading-relaxed">Frontend, Backend, and DevOps agents working in parallel orchestration.</p>
                 </div>
                 
                 <div className="group bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-2xl shadow-black">
                   <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/10 group-hover:scale-110 transition-transform">
                      <Activity className="w-5 h-5 text-purple-400" />
                   </div>
                   <h4 className="text-white font-medium mb-2 tracking-wide">Live Execution</h4>
                   <p className="text-sm text-zinc-500 leading-relaxed">See every task, logic flow, and deployment as it happens live.</p>
                 </div>
               </div>
             </motion.div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="relative"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-xl blur opacity-30"></div>
              
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <BlueprintMap className="aspect-[4/3] md:aspect-video" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur border border-white/10 px-3 py-1 rounded-md flex items-center gap-2">
                   <Zap className="w-3 h-3 text-yellow-400" />
                   <span className="text-[10px] font-mono text-zinc-400">SYSTEM ACTIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};