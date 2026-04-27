"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "../components/canvas/HeroCanvas";

export function AlchemistHero() {
  return (
    <section id="hero" className="pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto relative overflow-hidden bg-zinc-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full"
      >
        <div className="space-y-8">
          <p 
            style={{ color: '#8B5CF6' }}
            className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold"
          >
            Digital Solutions for Modern Businesses
          </p>
          <h1 className="font-sans text-5xl md:text-7xl leading-[1.1] tracking-[-0.04em] text-zinc-900 font-black">
            We Build Custom <br/> Software to Help <br/> Your Business Grow.
          </h1>
          <h2 className="font-sans text-2xl text-zinc-500 font-light leading-relaxed">
            Copper Boston Group helps you automate your work and save operational costs with smart technology solutions.
          </h2>
          
          <div className="pt-4">
            <button 
              style={{ backgroundColor: '#8B5CF6' }}
              className="text-white px-10 py-5 font-bold uppercase tracking-widest text-[13px] hover:opacity-90 transition-all duration-300"
            >
              Get a Free Quote
            </button>
          </div>

          <div className="pt-12">
            <h3 className="font-sans text-xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Technology Made Simple</h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-md font-light">
              We focus on building software that actually works for you, making your daily business tasks easier and more efficient.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-square md:aspect-[4/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group shadow-2xl shadow-zinc-200/50">
           <HeroCanvas />
           <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}