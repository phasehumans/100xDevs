import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Agent {
  id: string;
  role: string;
  color: string;
  glowColor: string;
  x: number;
  y: number;
}

const AGENTS_CONFIG = [
  { id: 'fe', role: 'Frontend', color: '#22d3ee', glowColor: 'rgba(34, 211, 238, 0.8)' },
  { id: 'be', role: 'Backend', color: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.8)' },
  { id: 'ui', role: 'Designer', color: '#c084fc', glowColor: 'rgba(192, 132, 252, 0.8)' },
  { id: 'ai', role: 'AI Eng', color: '#4ade80', glowColor: 'rgba(74, 222, 128, 0.8)' },
  { id: 'ops', role: 'DevOps', color: '#fb923c', glowColor: 'rgba(251, 146, 60, 0.8)' },
  { id: 'qa', role: 'QA', color: '#f472b6', glowColor: 'rgba(244, 114, 182, 0.8)' },
  { id: 'pm', role: 'Product', color: '#facc15', glowColor: 'rgba(250, 204, 21, 0.8)' },
];

const TASKS = {
  fe: ['Hydrating', 'Diffing', 'Painting', 'Compositing', 'Shaking', 'Bundling', 'Parsing'],
  be: ['Indexing', 'Caching', 'Querying', 'Serving', 'Hashing', 'Salting', 'Routing'],
  ui: ['Aligning', 'Masking', 'Kerning', 'Scaling', 'Exporting', 'Tweening', 'Rendering'],
  ai: ['Inferencing', 'Vectorizing', 'Training', 'Tokenizing', 'Predicting', 'Embedding', 'Reasoning'],
  ops: ['Orchestrating', 'Balancing', 'Containerizing', 'Deploying', 'Scaling', 'Logging', 'Pinging'],
  qa: ['Fuzzing', 'Emulating', 'Tracing', 'Verifying', 'Asserting', 'Mocking', 'Snapshotting'],
  pm: ['Analyzing', 'Scoping', 'Tracking', 'Prioritizing', 'Planning', 'Reviewing', 'Iterating'],
};

// Coordinate system: 1600x900 (16:9 aspect ratio)
const VIRTUAL_WIDTH = 1600;
const VIRTUAL_HEIGHT = 900;

// Zones for logical movement matched to the new architectural layout
const ZONES = [
  // Sector A: Server Room (Left Strip)
  { x: 100, y: 150, w: 200, h: 600 },
  // Sector B: Main Dev Floor (Center Large)
  { x: 400, y: 200, w: 800, h: 500 },
  // Sector C: Meeting Rooms (Right Strip)
  { x: 1300, y: 150, w: 200, h: 250 }, // Top room
  { x: 1300, y: 500, w: 200, h: 250 }, // Bottom room
  // Corridor Top
  { x: 100, y: 80, w: 1400, h: 50 },
  // Corridor Bottom
  { x: 100, y: 800, w: 1400, h: 50 },
];

interface BlueprintMapProps {
  className?: string;
  transparent?: boolean;
  hideOverlay?: boolean;
}

export const BlueprintMap: React.FC<BlueprintMapProps> = ({ 
  className = '', 
  transparent = false,
  hideOverlay = false
}) => {
  const [agents, setAgents] = useState<Agent[]>(AGENTS_CONFIG.map(a => ({ 
    ...a, 
    x: VIRTUAL_WIDTH / 2, 
    y: VIRTUAL_HEIGHT / 2 
  })));
  
  const [activeTasks, setActiveTasks] = useState<Record<string, string>>({});

  const getRandomPosition = () => {
    // Pick a random zone
    const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
    return {
      x: zone.x + Math.random() * zone.w,
      y: zone.y + Math.random() * zone.h
    };
  };

  useEffect(() => {
    const moveAgent = (index: number) => {
      setAgents(prev => {
        const newAgents = [...prev];
        const target = getRandomPosition();
        newAgents[index] = { ...newAgents[index], x: target.x, y: target.y };
        return newAgents;
      });
    };

    // Initial scatter
    agents.forEach((_, i) => moveAgent(i));

    // Periodic movement
    const intervals = agents.map((_, i) => {
      const duration = 3000 + Math.random() * 4000;
      return setInterval(() => moveAgent(i), duration);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Task Generation System
  useEffect(() => {
    const taskInterval = setInterval(() => {
      const candidates = [...agents].sort(() => 0.5 - Math.random()).slice(0, 3);
      candidates.forEach(agent => {
        if (activeTasks[agent.id]) return;
        const roleTasks = TASKS[agent.id as keyof typeof TASKS];
        const task = roleTasks[Math.floor(Math.random() * roleTasks.length)];
        setActiveTasks(prev => ({ ...prev, [agent.id]: task }));

        setTimeout(() => {
          setActiveTasks(prev => {
            const newState = { ...prev };
            delete newState[agent.id];
            return newState;
          });
        }, 1500 + Math.random() * 1000);
      });
    }, 500);

    return () => clearInterval(taskInterval);
  }, [activeTasks, agents]);

  const containerStyles = transparent 
    ? `relative w-full h-full overflow-hidden ${className}`
    : `relative w-full aspect-video bg-[#0c0c0e] overflow-hidden rounded-xl shadow-2xl border border-white/5 ${className}`;

  return (
    <div className={containerStyles}>
      
      {/* 1. Base Grid Layer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* 2. SVG Architectural Map */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1600 900" preserveAspectRatio="none">
        
        <defs>
           <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
             <path d="M 0 0 L 0 10" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
           </pattern>
        </defs>

        {/* --- Structure: Walls & Rooms --- */}
        
        {/* Outer Perimeter */}
        <rect x="20" y="20" width="1560" height="860" rx="10" stroke="#52525b" strokeWidth="4" fill="none" />

        {/* Sector A: Server Farm (Left) */}
        <path d="M 350 20 L 350 880" stroke="#52525b" strokeWidth="2" />
        <rect x="50" y="50" width="250" height="800" fill="url(#hatch)" opacity="0.5" />
        {/* Racks Left */}
        {[100, 200, 300, 400, 500, 600, 700].map(y => (
           <rect key={`rl-${y}`} x="80" y={y} width="80" height="60" stroke="#71717a" strokeWidth="1" fill="none" />
        ))}
        {/* Racks Right */}
        {[100, 200, 300, 400, 500, 600, 700].map(y => (
           <rect key={`rr-${y}`} x="200" y={y} width="80" height="60" stroke="#71717a" strokeWidth="1" fill="none" />
        ))}
        {!hideOverlay && (
          <text x="180" y="860" textAnchor="middle" fill="#52525b" fontSize="14" fontFamily="monospace" letterSpacing="0.2em">SERVER FARM</text>
        )}


        {/* Sector C: Executive/Meeting (Right) */}
        <path d="M 1250 20 L 1250 880" stroke="#52525b" strokeWidth="2" />
        {/* Room 1 */}
        <rect x="1280" y="150" width="250" height="250" stroke="#52525b" strokeWidth="1" fill="none" />
        <rect x="1350" y="220" width="110" height="110" rx="4" stroke="#3f3f46" strokeWidth="1" fill="none" /> {/* Table */}
        {/* Room 2 */}
        <rect x="1280" y="500" width="250" height="250" stroke="#52525b" strokeWidth="1" fill="none" />
        <circle cx="1405" cy="625" r="60" stroke="#3f3f46" strokeWidth="1" fill="none" /> {/* Round Table */}


        {/* Sector B: Open Plan (Center) */}
        {/* Central Hub */}
        <circle cx="800" cy="450" r="80" stroke="#52525b" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="800" cy="450" r="150" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />

        {/* Desk Clusters Top Left */}
        <g transform="translate(450, 150)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        <g transform="translate(650, 150)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        {/* Desk Clusters Top Right */}
        <g transform="translate(850, 150)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
         <g transform="translate(1050, 150)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        
        {/* Desk Clusters Bottom */}
        <g transform="translate(450, 670)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        <g transform="translate(650, 670)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        <g transform="translate(850, 670)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>
        <g transform="translate(1050, 670)">
           <rect x="0" y="0" width="120" height="80" stroke="#3f3f46" fill="none" />
           <line x1="60" y1="0" x2="60" y2="80" stroke="#3f3f46" />
        </g>


        {/* Dynamic Radar Effect */}
        <circle cx="800" cy="450" r="400" 
          stroke="url(#grid)" 
          strokeWidth="1" 
          strokeOpacity="0.1"
          fill="none" 
          className="animate-[spin_60s_linear_infinite]"
        />

      </svg>

      {/* 3. Agents */}
      {agents.map((agent) => (
        <React.Fragment key={agent.id}>
          {/* The Dot */}
          <motion.div
            className="absolute z-20"
            style={{ 
              width: activeTasks[agent.id] ? 14 : 10,
              height: activeTasks[agent.id] ? 14 : 10,
              borderRadius: '50%',
              backgroundColor: agent.color,
              boxShadow: `0 0 15px ${agent.glowColor}, 0 0 5px ${agent.color}`
            }}
            animate={{ 
              left: `${(agent.x / VIRTUAL_WIDTH) * 100}%`, 
              top: `${(agent.y / VIRTUAL_HEIGHT) * 100}%`,
              scale: activeTasks[agent.id] ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              left: { duration: 3, ease: "easeInOut" },
              top: { duration: 3, ease: "easeInOut" },
              scale: { duration: 0.5, repeat: activeTasks[agent.id] ? Infinity : 0 }
            }}
          />

          {/* Task Label */}
          <motion.div
            className="absolute z-30 pointer-events-none"
            animate={{ 
              left: `${(agent.x / VIRTUAL_WIDTH) * 100}%`, 
              top: `${(agent.y / VIRTUAL_HEIGHT) * 100}%` 
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
             <AnimatePresence mode='wait'>
              {activeTasks[agent.id] && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: -16 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="whitespace-nowrap bg-zinc-950/90 backdrop-blur border border-white/10 px-1.5 py-0.5 rounded-[4px] text-[9px] text-zinc-400 font-mono tracking-wide flex items-center gap-1.5 shadow-lg"
                >
                   <span className="w-1 h-1 rounded-full opacity-70" style={{ backgroundColor: agent.color }}></span>
                   <span className="text-zinc-300">{activeTasks[agent.id]}</span>
                </motion.div>
              )}
             </AnimatePresence>
          </motion.div>
        </React.Fragment>
      ))}

      {/* Overlay UI */}
      {!hideOverlay && (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
          
          <div className="flex justify-between w-full opacity-60">
            <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase">Sector A<br/><span className="text-[8px] opacity-70">Infrastructure</span></div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase text-center">Sector B<br/><span className="text-[8px] opacity-70">Development</span></div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase text-right">Sector C<br/><span className="text-[8px] opacity-70">Operations</span></div>
          </div>

          <div className="flex items-end justify-start">
            <div className="flex items-center gap-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded border border-white/10">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] font-mono text-zinc-300">
                ACTIVE AGENTS: <span className="text-white font-bold">{agents.length}</span>
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};