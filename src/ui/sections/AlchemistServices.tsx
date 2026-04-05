"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/lib/types";
import { Zap } from "lucide-react";

interface AlchemistServicesProps {
  services: ServiceData[];
}

export function AlchemistServices({ services }: AlchemistServicesProps) {
  return (
    <section id="services" className="w-full py-40 px-6 md:px-12 lg:px-24 bg-transparent relative z-10">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter text-white">
            The <span className="text-cyan-500">Arsenal.</span>
          </h2>
          <p className="max-w-xs font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase leading-relaxed">
            Specialized modules optimized for high-velocity digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative p-12 bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative Background ID */}
              <div className="absolute -bottom-4 -right-4 font-sans font-black text-9xl text-white/[0.02] pointer-events-none group-hover:text-cyan-500/[0.05] transition-colors duration-500">
                0{index + 1}
              </div>

              <div className="flex flex-col gap-8 relative z-10">
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-zinc-400 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
