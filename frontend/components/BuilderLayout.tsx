import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Code2, Copy, Download, Globe, Layout, Maximize2, Home, Moon, RotateCcw, Settings, Share2, Smartphone, Terminal, X, Paperclip, ChevronRight, File, Folder } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { DotMatrixLogo } from './DotMatrixLogo';

interface BuilderLayoutProps {
  initialPrompt?: string;
  onBack: () => void;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({ initialPrompt = '', onBack }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'user', content: initialPrompt || "Initialize project..." },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Sidebar Resizing State
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  
  // Loading State for Preview
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);

  // Resize Handlers
  const startResizing = React.useCallback(() => setIsResizing(true), []);
  const stopResizing = React.useCallback(() => setIsResizing(false), []);
  const resize = React.useCallback((mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
          const newWidth = mouseMoveEvent.clientX;
          if (newWidth >= 260 && newWidth <= 600) { // Min and Max constraints
              setSidebarWidth(newWidth);
          }
      }
  }, [isResizing]);

  useEffect(() => {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
      return () => {
          window.removeEventListener("mousemove", resize);
          window.removeEventListener("mouseup", stopResizing);
      };
  }, [resize, stopResizing]);

  // Simulate initial build time when redirected
  useEffect(() => {
    if (initialPrompt) {
      // Prompt response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: "I'm analyzing your request and initializing the development environment." }]);
      }, 1000);

      // Finish "building"
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: "I've generated the initial version. You can see the preview on the right. Let me know if you want to make any changes!" }]);
        setIsPreviewLoading(false);
      }, 4000);
    } else {
        setIsPreviewLoading(false);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
    
    // Simulate AI working
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Updating the codebase..." }]);
    }, 500);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Changes applied." }]);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden select-none font-sans">
      
      {/* Left Sidebar - Chat & Control */}
      <div 
        className="relative flex flex-col bg-[#050505] border-r border-white/10"
        style={{ width: sidebarWidth, flex: 'none' }}
      >
        {/* Resize Handle */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50 transition-colors z-50 group"
          onMouseDown={startResizing}
        >
             <div className={`w-[1px] h-full bg-white/5 group-hover:bg-blue-500/50 mx-auto ${isResizing ? 'bg-blue-500' : ''}`} />
        </div>

        {/* Header */}
        <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between shrink-0 bg-[#050505]">
          <div className="flex items-center gap-2">
             <DotMatrixLogo className="h-4 text-white" />
          </div>
          <button onClick={onBack} className="text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-mono mb-1">
                {msg.role === 'user' ? 'You' : 'Phase Agent'}
              </span>
              <div className={`rounded-xl p-3 text-sm leading-relaxed max-w-[90%] ${
                msg.role === 'user' 
                  ? 'bg-zinc-800 text-white' 
                  : 'bg-transparent border border-white/10 text-zinc-300'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#050505] shrink-0">
          <form onSubmit={handleSendMessage} className="relative bg-[#09090b] border border-white/10 rounded-xl focus-within:border-white/20 transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe changes..."
              className="w-full bg-transparent border-none text-sm text-white placeholder-zinc-600 focus:outline-none resize-none h-auto min-h-[50px] max-h-[120px] p-3 pr-10 pl-10"
              style={{ lineHeight: '1.5' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            
            {/* Attach Icon */}
            <button 
              type="button"
              className="absolute left-3 bottom-3 text-zinc-500 hover:text-white transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Submit Icon */}
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 p-1.5 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:bg-transparent disabled:text-zinc-600"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Toolbar */}
        <div className="h-14 border-b border-white/10 bg-[#050505] flex items-center justify-between px-4 shrink-0">
          {/* Left: Url Bar (Mock) */}
          <div className="flex-1 max-w-xl mx-auto hidden md:flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/50 px-3 py-1.5 rounded-md border border-white/5 font-mono">
             <Globe className="w-3 h-3" />
             <span className="truncate">https://phasehumans.app/preview/live-demo-v1</span>
             <RotateCcw className="w-3 h-3 ml-auto cursor-pointer hover:text-white" />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Layout className="w-3 h-3" /> Preview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'code' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Code2 className="w-3 h-3" /> Code
              </button>
            </div>
            
            <div className="h-4 w-px bg-white/10 mx-1"></div>

            <Button variant="outline" size="sm" className="hidden sm:flex h-8 text-xs border-white/10 bg-transparent">
              <Share2 className="w-3 h-3 mr-2" /> Share
            </Button>
            <Button variant="primary" size="sm" className="hidden sm:flex h-8 text-xs">
               Publish
            </Button>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 bg-[#0c0c0e] relative overflow-hidden flex items-center justify-center p-0">
          {activeTab === 'preview' ? (
            <div className="w-full h-full relative">
              {isPreviewLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c0e] text-center p-8">
                   <div className="w-16 h-16 mb-6 relative">
                      <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin reverse"></div>
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2">Building your vision...</h2>
                   <p className="text-zinc-500 max-w-md">
                     Phase Humans are compiling your layout, generating assets, and writing tests.
                   </p>
                   <div className="flex gap-2 mt-6">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></span>
                   </div>
                </div>
              ) : (
                <div className="w-full h-full bg-white flex flex-col animate-in fade-in duration-500">
                  {/* Website Preview Iframe/Mock */}
                  <div className="flex-1 overflow-auto bg-white text-black font-sans">
                     {/* Mock Header */}
                     <header className="px-8 py-5 flex items-center justify-between border-b">
                        <div className="font-bold text-xl">MyStartUp</div>
                        <nav className="flex gap-6 text-sm font-medium text-gray-600">
                           <a href="#" className="hover:text-black">Features</a>
                           <a href="#" className="hover:text-black">Pricing</a>
                           <a href="#" className="hover:text-black">About</a>
                        </nav>
                        <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">Get Started</button>
                     </header>
                     {/* Mock Hero */}
                     <section className="px-8 py-20 text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
                           Building the future,<br/> one pixel at a time.
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                           A completely autonomous web development experience. Describe your dream, and we build it instantly.
                        </p>
                        <div className="flex justify-center gap-4">
                           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Start Free Trial</button>
                           <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200">View Demo</button>
                        </div>
                     </section>
                     {/* Mock Grid */}
                     <section className="px-8 py-10 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                           {[1,2,3].map(i => (
                             <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4"></div>
                                <h3 className="font-bold mb-2">Feature {i}</h3>
                                <p className="text-gray-500 text-sm">Automated feature description goes here.</p>
                             </div>
                           ))}
                        </div>
                     </section>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // IDE Code View
            <div className="w-full h-full flex bg-[#1e1e1e] font-mono text-sm">
               {/* File Explorer */}
               <div className="w-64 border-r border-white/10 flex flex-col">
                  <div className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Explorer</div>
                  <div className="flex-1 overflow-y-auto">
                     <FileTreeItem name="src" isFolder isOpen>
                        <FileTreeItem name="components" isFolder isOpen>
                           <FileTreeItem name="Header.tsx" />
                           <FileTreeItem name="Hero.tsx" />
                           <FileTreeItem name="FeatureGrid.tsx" />
                        </FileTreeItem>
                        <FileTreeItem name="App.tsx" isActive />
                        <FileTreeItem name="index.css" />
                        <FileTreeItem name="main.tsx" />
                     </FileTreeItem>
                     <FileTreeItem name="public" isFolder />
                     <FileTreeItem name="package.json" />
                     <FileTreeItem name="tsconfig.json" />
                  </div>
               </div>
               
               {/* Editor */}
               <div className="flex-1 flex flex-col">
                  <div className="flex border-b border-white/5 bg-[#1e1e1e]">
                     <div className="px-4 py-2 bg-[#252526] text-zinc-200 text-xs border-r border-white/5 flex items-center gap-2 border-t-2 border-t-blue-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="w-3 h-3" alt="react"/>
                        App.tsx
                        <X className="w-3 h-3 ml-2 text-zinc-500 hover:text-white cursor-pointer" />
                     </div>
                  </div>
                  <div className="flex-1 p-4 overflow-auto text-blue-300">
<pre className="text-zinc-300 leading-relaxed">
{`import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero 
          title="Building the future" 
          subtitle="Autonomous web development." 
        />
        
        <FeatureGrid />
      </main>
      
      <footer className="py-8 text-center text-gray-500">
        © 2024 MyStartUp Inc.
      </footer>
    </div>
  );
}`}
</pre>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper for Mock File Tree
const FileTreeItem = ({ name, isFolder, isOpen, children, isActive }: { name: string, isFolder?: boolean, isOpen?: boolean, children?: React.ReactNode, isActive?: boolean }) => (
  <div className="pl-2">
     <div className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${isActive ? 'bg-blue-500/20 text-blue-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}>
        {isFolder ? (
           <Folder className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} fill="currentColor" fillOpacity={0.2} />
        ) : (
           <File className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
        )}
        <span className="truncate">{name}</span>
     </div>
     {isOpen && children && (
        <div className="pl-3 border-l border-white/5 ml-2.5">
           {children}
        </div>
     )}
  </div>
);