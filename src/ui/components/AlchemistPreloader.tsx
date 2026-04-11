"use client";

import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";

interface AlchemistPreloaderProps {
  onComplete: () => void;
}

export function AlchemistPreloader({ onComplete }: AlchemistPreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("INITIALIZING_CORE");

  const statuses = [
    "SYNCING_NODES",
    "DECRYPTING_ASSETS",
    "BYPASSING_RESTRICTIONS",
    "COMPILING_INTERFACE",
    "ACCESS_GRANTED"
  ];

  useEffect(() => {
    // Counter Animation
    const counter = { val: 0 };
    anime({
      targets: counter,
      val: 100,
      duration: 3000,
      easing: 'easeInOutExpo',
      update: function() {
        setPercent(Math.floor(counter.val));
      },
      complete: () => {
        // Wipe Out Animation
        anime({
          targets: '.preloader-container',
          translateY: '-100%',
          easing: 'easeInOutExpo',
          duration: 1000,
          complete: () => onComplete()
        });
      }
    });

    // Random Status Rotator
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      if (statusIndex < statuses.length) {
        setStatus(statuses[statusIndex]);
        statusIndex++;
      }
    }, 500);

    return () => clearInterval(statusInterval);
  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Progress Display */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase">System_State</span>
            <span className="font-sans font-black text-6xl text-white italic">{percent}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-100 ease-out" 
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Console Log */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase tracking-widest leading-none">
              STATUS: <span className="text-white">{status}</span>
            </span>
          </div>
          <p className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest pl-4">
            [IRFN_NG]::NODE_0{percent % 5}_REACHED
          </p>
        </div>
      </div>
    </div>
  );
}
