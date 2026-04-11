"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';

export function AlchemistHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // ELITE TYPOGRAPHY REVEAL STRATORY - SYNCED WITH PRELOADER
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200,
    });

    // 1. Line 1 (Digital) - Starts at 3500ms
    tl.add({
      targets: '.hero-line-1 .char',
      translateY: [100, 0],
      opacity: [0, 1],
      rotateX: [45, 0],
      delay: anime.stagger(40, { from: 'center', start: 3500 }),
    }, 0);

    // 2. Line 2 (Alchimistra)
    tl.add({
      targets: '.hero-line-2 .char',
      translateY: [150, 0],
      opacity: [0, 1],
      rotateX: [60, 0],
      delay: anime.stagger(30, { from: 'center', start: 3800 }),
    }, 100);

    // 3. Description Reveal
    tl.add({
      targets: '.hero-desc',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuart',
    }, 4200);

    // 4. Strike Line
    tl.add({
      targets: '.hero-strike',
      width: [0, 100],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeInOutQuad',
    }, 4500);

    // 5. Contact Button
    tl.add({
      targets: '.hero-cta',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
    }, 4300);

    // 6. Perspective Warp for the whole stage
    anime({
      targets: '.hero-stage',
      rotateX: [30, 0],
      rotateY: [-10, 0],
      scale: [0.7, 1],
      opacity: [0, 1],
      duration: 2500,
      delay: 3500, // Sync with preloader
      easing: 'easeOutExpo'
    });

  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block" style={{ perspective: '1000px' }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="hero-stage z-10 flex flex-col items-center" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">
            Operation: Alchemist Strike // Site_Initialization_Complete
          </span>
        </motion.div>

        <h1 ref={titleRef} className="font-sans font-black uppercase tracking-tighter leading-[0.8] overflow-hidden flex flex-col items-center">
          <span className="hero-line-1 block text-[11vw] md:text-[9vw] text-white/40 pb-2 whitespace-nowrap">
            {splitText("Digital")}
          </span>
          <span className="hero-line-2 block text-[13vw] md:text-[11vw] text-white whitespace-nowrap">
            {splitText("Alchimistra")}
          </span>
        </h1>
        
        <div className="mt-8 flex flex-col items-center gap-6 text-center">
          <div className="hero-desc opacity-0 flex flex-col items-center">
            <p className="max-w-xl text-zinc-400 text-lg md:text-xl font-medium tracking-[0.2em] uppercase text-center">
              Building high-performance <span className="text-cyan-400 italic">digital products</span> that scale your business.
            </p>

            <p className="max-w-2xl text-zinc-500 text-sm md:text-base font-sans mt-4 leading-relaxed tracking-wide text-center">
              Alchimistra is a premium digital studio that turns complex business ideas into high-performance web and mobile solutions.
            </p>
          </div>
          
          <div className="hero-cta mt-6 opacity-0 flex justify-center">
            <a 
              href="https://wa.me/60183823063?text=Hello%20Irfan,%20I%20saw%20your%20portfolio..." 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-sans font-black uppercase text-xs tracking-[0.2em] hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              START_PROJECT
            </a>
          </div>
          
          <div className="hero-strike h-[1px] bg-cyan-500 opacity-0 mx-auto" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-mono text-[8px] tracking-[0.4em] text-zinc-500 uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
