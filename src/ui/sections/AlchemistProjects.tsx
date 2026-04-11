"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { ProjectData } from "@/lib/types";
import { cn } from "@/lib/utils";

// DYNAMIC WINDOW HOOK
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

export function AlchemistProjects({ projects }: { projects: ProjectData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayProjects = projects.slice(0, 5);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, // Slightly softer for 3D feel
    damping: 30,
    mass: 1
  });

  // DYNAMIC CENTER MATH
  const cardWidth = isMobile ? 85 : 50;
  const gap = 5;
  const centerOffset = (100 - cardWidth) / 2;
  
  const segments = displayProjects.map((_, i) => {
    if (displayProjects.length <= 1) return 0.5;
    return 0.12 + (i * 0.76) / (displayProjects.length - 1);
  });
  const xValues = displayProjects.map((_, i) => `${centerOffset - (i * (cardWidth + gap))}vw`);

  const x = useTransform(smoothProgress, segments, xValues);

  // ATMOSPHERIC BACKGROUND
  const backgroundColor = useTransform(smoothProgress, [0, 0.2, 0.8, 1], ["#000000", "#01080b", "#01080b", "#000000"]);

  return (
    <motion.section 
      id="projects"
      ref={containerRef} 
      style={{ backgroundColor }}
      className="relative h-[600vh] w-full" 
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Spatial Title Overlay */}
        <div className="absolute top-20 left-12 md:left-24 z-20 pointer-events-none">
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
            className="space-y-4"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase block tracking-widest">SELECTED_WORKS</span>
            <h2 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter text-white leading-[0.8] mb-4">
              The <br />
              Vault.
            </h2>
          </motion.div>
        </div>

        {/* Exhibition Status (Top Right) */}
        <div className="absolute top-20 right-12 md:right-24 z-20 pointer-events-none text-right">
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
            className="space-y-1"
          >
             <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">System_Live</span>
             <span className="font-mono text-[10px] text-cyan-500 uppercase block">ORCHESTRATING_S_RANK_PIXELS</span>
          </motion.div>
        </div>
        {/* Background Depth Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03] pointer-events-none" 
             style={{ perspective: '1500px', transform: 'rotateX(80deg) translateY(-20%) scale(3)' }} />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[60vh] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HORIZONTAL PROJECT TRACK */}
        <motion.div style={{ x, gap: `${gap}vw` }} className="flex items-center">
          {displayProjects.map((project, index) => (
            <ProjectGalleryCard 
              key={project.id} 
              project={project} 
              index={index} 
              targetProgress={segments[index]}
              progress={smoothProgress} 
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* BOTTOM HUD */}
        <div className="absolute bottom-12 left-12 right-12 z-20 flex justify-between items-end border-t border-white/5 pt-8">
           <div className="flex flex-col gap-1">
              <span className="font-mono text-[8px] text-cyan-500/50 uppercase tracking-[0.5em]">System.Gallery_Focus</span>
              <div className="flex items-baseline gap-4">
                <span className="font-sans font-black text-4xl text-white italic">
                  <HUDCounter progress={smoothProgress} total={displayProjects.length} />
                </span>
                <span className="font-mono text-[10px] text-zinc-600">/ 0{displayProjects.length}</span>
              </div>
           </div>
           
           <div className="flex flex-col items-end gap-4">
              <div className="flex gap-2 items-end h-3">
                 {displayProjects.map((_, i) => (
                    <HUDIndicator 
                      key={i} 
                      index={i} 
                      progress={smoothProgress} 
                      target={segments[i]} 
                    />
                 ))}
              </div>
              <div className="w-48 h-[1px] bg-white/10 relative">
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-cyan-500" 
                    style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                 />
              </div>
           </div>
        </div>
      </div>
    </motion.section>
  );
}

function HUDCounter({ progress, total }: { progress: any, total: number }) {
  const [displayCount, setDisplayCount] = useState(1);
  
  useMotionValueEvent(progress, "change", (latest) => {
    const current = Math.min(total, Math.max(1, Math.round(latest * (total - 1)) + 1));
    if (current !== displayCount) setDisplayCount(current);
  });

  return <>0{displayCount}</>;
}

function HUDIndicator({ index, progress, target }: { index: number, progress: any, target: number }) {
  const height = useTransform(progress, [target - 0.15, target, target + 0.15], [4, 12, 4]);
  const backgroundColor = useTransform(
    progress, 
    [target - 0.15, target, target + 0.15], 
    ["rgba(255,255,255,0.1)", "#06b6d4", "rgba(255,255,255,0.1)"]
  );

  return <motion.div style={{ width: 2, height, backgroundColor }} className="transition-colors duration-300" />;
}

function ProjectGalleryCard({ project, index, targetProgress, progress, isMobile }: { project: ProjectData, index: number, targetProgress: number, progress: any, isMobile: boolean }) {
  const start = targetProgress - 0.25;
  const end = targetProgress + 0.25;

  // ELITE MOTION PROPERTIES
  const rotateY = useTransform(progress, [start, targetProgress, end], [30, 0, -30]);
  const z = useTransform(progress, [start, targetProgress, end], [-400, 100, -400]);
  const scale = useTransform(progress, [start, targetProgress, end], [0.85, 1.05, 0.85]);
  const opacity = useTransform(progress, [start, targetProgress - 0.12, targetProgress, targetProgress + 0.12, end], [0, 1, 1, 1, 0]);
  
  const filter = useTransform(
    progress, 
    [start, targetProgress, end], 
    [`blur(10px) grayscale(100%)`, `blur(0px) grayscale(0%)`, `blur(10px) grayscale(100%)`]
  );

  const xImage = useTransform(progress, [start, end], ["-20%", "20%"]);
  const infoOpacity = useTransform(progress, [targetProgress - 0.08, targetProgress, targetProgress + 0.08], [0, 1, 0]);

  return (
    <motion.div 
      style={{ 
        rotateY,
        z,
        opacity,
        scale,
        filter,
        perspective: '2500px',
        transformStyle: 'preserve-3d'
      }}
      className="relative shrink-0 w-[85vw] md:w-[50vw] flex flex-col group will-change-transform transform-gpu"
    >
      {/* Visual Container */}
      <div className="relative aspect-[16/10] bg-zinc-950 border border-white/5 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div style={{ x: xImage, scale: 1.3 }} className="absolute inset-0">
            {project.image_primary && (
              <Image 
                src={project.image_primary} 
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
          </motion.div>
        </div>
        
        {/* Desktop Overlay Gradient */}
        {!isMobile && <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />}

        {/* Holographic Border Frame */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-500" />
        </div>

        {/* Scanning Laser Line */}
        <motion.div 
          style={{ top: useTransform(progress, [start, end], ["0%", "100%"]) }}
          className="absolute left-0 w-full h-[1px] bg-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-30 pointer-events-none" 
        />
      </div>

      {/* Content Info Section */}
      <motion.div 
        style={{ opacity: infoOpacity }} 
        className={cn(
          "z-20",
          isMobile 
            ? "mt-6 space-y-4 px-2" 
            : "absolute bottom-12 left-12 right-12 space-y-6"
        )}
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="font-mono text-[8px] md:text-[9px] text-cyan-500 tracking-[0.4em] uppercase block">
            MODULE_REF_0{index+1}
          </span>
          <h3 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-white leading-none">
            {project.title}
          </h3>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4">
          <p className={cn(
            "font-sans text-zinc-400 leading-relaxed",
            isMobile ? "text-xs max-w-full" : "text-sm max-w-sm"
          )}>
            {project.description}
          </p>
          
          {project.live_url && (
            <a 
              href={project.live_url}
              target="_blank"
              className="shrink-0 px-6 py-3 bg-white text-black font-sans font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-300 w-full md:w-auto text-center"
            >
              VIEW_STATION
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
