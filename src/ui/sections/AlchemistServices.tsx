"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ServiceData } from "@/lib/types";
import { Zap } from "lucide-react";
import React, { MouseEvent as ReactMouseEvent, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

interface AlchemistServicesProps {
  services: ServiceData[];
}

export function AlchemistServices({ services }: AlchemistServicesProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${mouseXSpring}px ${mouseYSpring}px, black 0%, transparent 100%)`;

  const triggerBorderDraw = (id: string | number) => {
    const path = document.querySelector(`#service-svg-${id} path`) as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      
      anime({
        targets: path,
        strokeDashoffset: [length, 0],
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1200,
        delay: 300,
      });
    }
  };

  return (
    <section 
      id="services" 
      onMouseMove={handleMouseMove}
      className="w-full py-40 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#030303] to-[#0a0a0a] relative z-10 overflow-hidden group/section"
    >
      {/* Animated Background Grid Pattern with Spotlight Mask */}
      <motion.div 
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
        className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none transition-opacity duration-500 group-hover/section:opacity-70" 
      />
      
      {/* Base Grid (Very Faint) */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03] pointer-events-none" />
      
      <div className="flex flex-col gap-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter text-white">
            Our <span className="text-cyan-500">Services.</span>
          </h2>
          <p className="max-w-xs font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase leading-relaxed">
            Specialized development solutions tailored for growth and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportEnter={() => triggerBorderDraw(service.id)}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group relative p-12 bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* SVG Technical Border Drawing Layer */}
              <svg 
                id={`service-svg-${service.id}`}
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M 0.5,0.5 L 99.5,0.5 L 99.5,99.5 L 0.5,99.5 Z" 
                  fill="none" 
                  stroke="rgba(6, 182, 212, 0.8)" 
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="service-border-path opacity-0"
                />
              </svg>

              {/* Decorative Background ID */}
              <div className="absolute -bottom-4 -right-4 font-sans font-black text-9xl text-white/[0.02] pointer-events-none group-hover:text-cyan-500/[0.05] transition-colors duration-500">
                0{index + 1}
              </div>

              {/* Glowing Border Beam Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 border border-cyan-500/20" />
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(6,182,212,0.4)_360deg)] opacity-40"
                />
              </div>

              <div className="flex flex-col gap-8 relative z-10">
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-zinc-400 leading-relaxed max-w-md text-sm md:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute top-[-1px] right-[-1px] w-2 h-2 bg-cyan-500/20 border-r border-t border-cyan-500/40" />
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 bg-cyan-500/20 border-l border-b border-cyan-500/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
