"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function AlchemistNavbar() {
  const [activeSection, setActiveSection] = useState("HOME");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["services", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 300 && rect.bottom > 300) {
            setActiveSection(section.toUpperCase());
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection("HOME");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      if (id === "HOME") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex justify-center pt-6 md:pt-8 px-6">
        <motion.div 
          animate={{
            width: isScrolled ? "auto" : "100%",
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.7)" : "transparent",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            border: isScrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
            padding: isScrolled ? "0.75rem 1.5rem" : "0rem",
            boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
          }}
          className="flex justify-between items-center transition-all duration-300 gap-8 md:gap-12"
        >
          <div className="pointer-events-auto shrink-0">
            <button onClick={() => scrollTo("HOME")} className="font-sans font-black text-xl tracking-tighter text-white">
              ALCHIMISTRA<span className="text-cyan-500">.</span>
            </button>
          </div>

          <nav className="pointer-events-auto hidden md:flex items-center gap-8 lg:gap-12 shrink-0">
            {["SERVICES", "PROJECTS", "CONTACT"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={cn(
                  "font-mono text-[10px] tracking-[0.3em] transition-all duration-300",
                  activeSection === link ? "text-cyan-400" : "text-zinc-300 hover:text-white"
                )}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-6 shrink-0">
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:flex flex-col items-end overflow-hidden whitespace-nowrap"
                >
                  <span className="font-mono text-[8px] text-zinc-400 tracking-widest uppercase">Location</span>
                  <span className="font-mono text-[9px] text-white tracking-[0.2em] uppercase">{activeSection}</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full md:hidden"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
            </button>

            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse hidden md:block" />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            className="fixed inset-0 z-[95] bg-black flex flex-col items-center justify-center p-6 md:hidden"
          >
            {/* Vertical Blueprint Label */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden sm:block">
              <span className="font-mono text-[8px] text-cyan-500/40 tracking-[0.6em] uppercase whitespace-nowrap">Alchimistra_Matrix_System</span>
            </div>

            {/* Mobile-only centered label above navigation */}
            <div className="mb-12 sm:hidden">
              <span className="font-mono text-[8px] text-cyan-500 tracking-[0.4em] uppercase">Alchimistra_Matrix</span>
            </div>

            <nav className="flex flex-col items-center gap-8">
              {["SERVICES", "PROJECTS", "CONTACT"].map((link, index) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="font-sans font-black text-5xl tracking-tighter text-white hover:text-cyan-500 transition-colors uppercase"
                >
                  {link}
                </motion.button>
              ))}
            </nav>

            <div className="absolute bottom-10 flex flex-col items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping" />
              <span className="font-mono text-[8px] text-zinc-600 tracking-[0.3em] uppercase">Alchimistra Studio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
