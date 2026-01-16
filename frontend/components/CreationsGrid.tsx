import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { X, ExternalLink, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export interface CreationItem {
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
}

interface CreationsGridProps {
  title: string;
  subtitle?: string;
  items: CreationItem[];
  limit?: number;
}

export const CreationsGrid: React.FC<CreationsGridProps> = ({ title, subtitle, items, limit = 10 }) => {
  const [active, setActive] = useState<CreationItem | boolean | null>(null);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const visibleItems = showAll ? items : items.slice(0, limit);
  const hasMore = items.length > limit;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="py-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <div className="mb-8 flex items-end justify-between">
           <div>
             <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
             {subtitle && <p className="text-zinc-500 text-xs mt-1">{subtitle}</p>}
           </div>
           {hasMore && (
             <button 
               onClick={() => setShowAll(!showAll)}
               className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
             >
               {showAll ? 'Show Less' : 'View all'}
               <ArrowRight className={`w-3 h-3 transition-transform ${showAll ? 'rotate-180' : ''}`} />
             </button>
           )}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-[100]"
            />
          )}
        </AnimatePresence>

        {/* Active Card Modal */}
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[110] p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#0c0c0e] border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
              >
                <motion.div 
                  layoutId={`image-${active.title}-${id}`} 
                  className="relative h-64 md:h-80 w-full"
                >
                  <img
                    src={active.src}
                    alt={active.title}
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Close Button Mobile */}
                  <motion.button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                    onClick={() => setActive(null)}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex justify-between items-start p-6 border-b border-white/5">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-xl font-bold text-white mb-1"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-sm text-zinc-400"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layoutId={`button-${active.title}-${id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-2 text-xs font-bold bg-white text-black rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                      {active.ctaText} <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </div>
                  
                  <div className="p-6 overflow-auto">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-zinc-400 text-sm leading-relaxed space-y-4"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Grid List - Updated to 5 columns */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {visibleItems.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="group flex flex-col bg-[#0c0c0e] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] rounded-xl cursor-pointer transition-colors duration-300 overflow-hidden"
              >
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-zinc-900">
                  <motion.div 
                    layoutId={`image-${card.title}-${id}`} 
                    className="w-full h-full"
                  >
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Preview Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                        Preview
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-3 flex flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-sm text-zinc-300 group-hover:text-white transition-colors truncate"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors line-clamp-1 mt-0.5"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
        
        {/* Mobile View All Button */}
        {hasMore && (
           <div className="mt-8 flex justify-center md:hidden">
              <button 
               onClick={() => setShowAll(!showAll)}
               className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors"
             >
               {showAll ? 'Show Less' : 'View All'}
               {showAll ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
             </button>
           </div>
        )}
      </div>
    </section>
  );
};