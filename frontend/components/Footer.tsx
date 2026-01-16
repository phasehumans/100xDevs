import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { DotMatrixLogo } from './DotMatrixLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column - Explicitly align items to start (left) */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6 items-start">
            <div className="flex items-center -ml-0.5"> {/* Slight negative margin to offset visual padding if any */}
               <DotMatrixLogo className="h-4 text-white/90" />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm text-left">
              The world's first autonomous AI web development agency. 
              We transform natural language prompts into production-ready, full-stack applications instantly.
            </p>
          </div>
          
          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-medium text-sm mb-6 tracking-wide">Product</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Changelog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Docs</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-medium text-sm mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-medium text-sm mb-6 tracking-wide">Social</h3>
            <div className="flex gap-3">
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Github} href="#" />
              <SocialLink icon={Linkedin} href="#" />
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-medium">
          <p>© 2024 Phase Humans Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300 group"
  >
    <Icon size={16} className="group-hover:scale-110 transition-transform" />
  </a>
);