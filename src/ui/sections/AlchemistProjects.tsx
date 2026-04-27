"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RevealImage } from "../components/canvas/RevealImage";
import { ArrowUpRight } from "lucide-react";

export function AlchemistProjects({ projects }: { projects: ProjectData[] }) {
  // We prioritize the first 6 projects for the corporate grid strike
  const displayProjects = projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 bg-zinc-50 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto relative z-10"
      >
        <div className="mb-24 text-left">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">Portfolio</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">Check our Portfolio</span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
          <p className="font-sans text-base text-zinc-500 font-light max-w-xl">
            We are currently searching for new collaborations and clients to build impactful digital solutions together.
          </p>
          </div>

          <div className="min-h-[400px] w-full border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-6 p-12 bg-white/50">
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>
            <div className="text-center space-y-3">
              <h3 className="font-sans text-lg font-bold text-zinc-900 uppercase tracking-widest">Searching for New Collaboration</h3>
              <p className="font-sans text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed tracking-wide uppercase">
                We are currently open for new projects and elite client partnerships. Ready for the next digital strike.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }