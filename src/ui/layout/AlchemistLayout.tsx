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
      <main className="w-full">
        {children}
      </main>
    </>
  );
}
