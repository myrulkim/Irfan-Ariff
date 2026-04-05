"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "STATUS", href: "#" },
  { name: "SERVICES", href: "#services" },
  { name: "STRIKES", href: "#projects" },
  { name: "HISTORY", href: "#experience" },
  { name: "CONTACT", href: "#contact" },
];

export function NoirNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveActiveSection] = useState("STATUS");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ["services", "projects", "experience", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 300 && rect.bottom > 300) {
            setActiveActiveSection(section.toUpperCase());
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveActiveSection("STATUS");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className={cn(
          "pointer-events-auto flex items-center gap-2 p-1.5 rounded-full border transition-all duration-500 backdrop-blur-3xl",
          isScrolled 
            ? "bg-black/40 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        )}
      >
        {/* Status Indicator HUD */}
        <div className="px-4 py-2 border-r border-white/5 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-elite-teal animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white">
            {activeSection}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center px-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "px-4 py-2 font-mono text-[9px] tracking-[0.2em] transition-all duration-300 uppercase",
                activeSection === (link.name === "STRIKES" ? "PROJECTS" : link.name === "HISTORY" ? "EXPERIENCE" : link.name)
                  ? "text-elite-teal"
                  : "text-zinc-500 hover:text-zinc-100"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action HUD */}
        <div className="hidden md:block pl-4 pr-2 border-l border-white/5">
          <button 
            onClick={() => scrollTo("#contact")}
            className="px-4 py-2 bg-white text-black font-mono text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-elite-teal hover:text-white transition-all duration-300"
          >
            STRIKE_NOW
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
