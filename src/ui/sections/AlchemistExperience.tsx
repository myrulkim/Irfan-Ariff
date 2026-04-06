"use client";

import { motion } from "framer-motion";
import { ExperienceData } from "@/lib/types";

interface AlchemistExperienceProps {
  experiences: ExperienceData[];
}

export function AlchemistExperience({ experiences }: AlchemistExperienceProps) {
  return (
    <section id="experience" className="w-full py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="flex flex-col gap-24">
        <div className="space-y-4">
          <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase">Deployment_History</span>
          <h2 className="font-sans font-black text-6xl md:text-9xl uppercase tracking-tighter text-white leading-none">
            Temporal <br />
            Archives.
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/5">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/5 hover:bg-white/[0.01] transition-all duration-500 px-4 items-start"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs text-zinc-400 group-hover:text-cyan-400 transition-colors">
                  [{exp.date_range}]
                </span>
              </div>
              
              <div className="md:col-span-4 space-y-2">
                <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white">
                  {exp.title}
                </h3>
                <p className="font-sans font-bold text-cyan-500 uppercase tracking-widest text-[10px]">
                  {exp.organization}
                </p>
              </div>

              <div className="md:col-span-6">
                <p className="font-sans text-lg text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
