"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AlchemistNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const sections = ["hero", "about", "services", "portfolio", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-white border-b border-zinc-100">
        <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1440px] mx-auto">
          <div 
            className={cn(
              "text-2xl font-black tracking-tighter uppercase cursor-pointer transition-colors duration-300",
              activeSection === "hero" ? "text-primary" : "text-zinc-900"
            )} 
            onClick={() => scrollTo("hero")}
          >
            CBG
          </div>

          <div className="hidden md:flex space-x-12">
            {["About", "Services", "Portfolio"].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;

              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={cn(
                    "relative font-sans tracking-[-0.04em] uppercase text-[11px] transition-all duration-300 pb-1 group",
                    isActive 
                      ? "text-zinc-900 font-bold border-b-2 border-zinc-900" 
                      : "text-zinc-400 font-light hover:text-zinc-900"
                  )}
                >
                  {link}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-900 transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => scrollTo("contact")}
              className={cn(
                "font-sans tracking-[-0.04em] uppercase font-bold text-[11px] border px-6 py-3 transition-all duration-300",
                activeSection === "contact"
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "text-zinc-900 border-zinc-200 hover:bg-zinc-50"
              )}
            >
              LET&apos;S TALK
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-900"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300" }}>
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[95] bg-white pt-32 px-6 md:hidden">
          <nav className="flex flex-col gap-10">
            {["About", "Services", "Portfolio", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="font-sans font-bold text-5xl tracking-tighter text-zinc-900 uppercase text-left"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}