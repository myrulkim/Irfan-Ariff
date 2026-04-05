"use client";

import { motion } from "framer-motion";
import { ProfileData } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface AlchemistContactProps {
  profile: ProfileData | null;
}

export function AlchemistContact({ profile }: AlchemistContactProps) {
  return (
    <section id="contact" className="w-full py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="flex flex-col gap-24">
        <h2 className="font-sans font-black text-6xl md:text-[12vw] uppercase tracking-tighter text-white leading-[0.8]">
          Let&apos;s <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Transmute</span> <br />
          The Future.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <p className="font-sans text-2xl text-zinc-400 max-w-md leading-tight">
              Alchimistra is currently accepting elite collaborations for 2026. Ready to architect your next mutation?
            </p>
            
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase">Neural_Link</span>
              <a href={`mailto:${profile?.email}`} className="font-sans font-black text-2xl md:text-4xl text-white hover:text-cyan-500 transition-colors break-all">
                {profile?.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-12 p-12 bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Identify_Self</label>
                <input type="text" placeholder="NAME / ORGANIZATION" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all placeholder:text-zinc-800" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Comm_Protocol</label>
                <input type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all placeholder:text-zinc-800" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Mission_Brief</label>
                <textarea rows={4} placeholder="DESCRIBE YOUR VISION" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-zinc-800" />
              </div>
              
              <button className="w-full py-6 bg-cyan-500 text-black font-sans font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white transition-all duration-500">
                INITIATE_TRANSMUTATION
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
        <span className="font-mono text-[9px] tracking-[0.4em] text-zinc-500">
          ALCHIMISTRA // THE ELITE ORCHESTRATOR
        </span>
        <span className="font-mono text-[9px] tracking-[0.4em] text-zinc-500 uppercase">
          © 2026 MISSION_CRITICAL
        </span>
      </div>
    </section>
  );
}
