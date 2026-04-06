"use client";

import { motion } from "framer-motion";

export function AlchemistHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center"
      >
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
            Open_To_Collaboration
          </span>
        </motion.div>

        <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.8]">
          <span className="block text-[12vw] md:text-[10vw] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            Digital
          </span>
          <span className="block text-[15vw] md:text-[13vw] text-white">
            Alchimistra
          </span>
        </h1>
        
        <div className="mt-8 flex flex-col items-center gap-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-xl text-zinc-400 text-lg md:text-xl font-medium tracking-[0.2em] uppercase"
          >
            Turning raw logic into <span className="text-cyan-400 italic">extraordinary</span> digital ecosystems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-2xl text-zinc-500 text-sm md:text-base font-sans leading-relaxed tracking-wide"
          >
            I don't just build applications. I architect systems that think, scale, and outlast their competition.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6"
          >
            <a 
              href="https://wa.me/60183823063?text=Hello%20Irfan,%20I%20saw%20your%20portfolio..." 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-sans font-black uppercase text-xs tracking-[0.2em] hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              DIRECT_INQUIRY
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-[1px] bg-cyan-500"
          />
        </div>
      </motion.div>

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
