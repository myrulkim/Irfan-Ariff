"use client";

import { useState, useRef } from "react";
import { AlchemistPreloader } from "../components/AlchemistPreloader";
import anime from "animejs/lib/anime.es.js";

interface AlchemistLayoutProps {
  children: React.ReactNode;
}

export function AlchemistLayout({ children }: AlchemistLayoutProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <AlchemistPreloader onComplete={() => setLoading(false)} />}
      
      <div 
        className="transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      >
        {children}
      </div>
    </>
  );
}
