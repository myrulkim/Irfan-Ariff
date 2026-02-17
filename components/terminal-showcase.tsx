"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

export function TerminalShowcase({ hideHeader = false, className }: { hideHeader?: boolean; className?: string }) {
    const [lines, setLines] = useState<string[]>([
        "> initializing vanguard...",
        "> load modules: [next, tw, xterm]",
        "> connect: wss://api.vanguard.dev",
        "> status: online",
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setLines((prev) => {
                if (prev.length > 8) return prev.slice(1);
                const newLines = [
                    "> running audit...",
                    "> lighthouse: 98/100",
                    "> perf: optimal",
                    "> seo: checking...",
                    "> seo: 100/100",
                    "> security: secure",
                ];
                // Simple random selection simulated
                const nextLine = newLines[Math.floor(Math.random() * newLines.length)];
                if (prev[prev.length - 1] === nextLine) return prev;
                return [...prev, nextLine];
            });
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={cn(
            "w-full h-full min-h-[14rem] bg-black relative font-mono text-xs p-4 flex flex-col transition-transform duration-500",
            !hideHeader && "rounded-xl overflow-hidden border border-white/10 group-hover/bento:scale-105",
            className
        )}>
            {/* Terminal Header */}
            {!hideHeader && (
                <div className="flex items-center gap-2 mb-4 opacity-50">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-neutral-500">vanguard-cli — -bash</span>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 space-y-2 text-green-500/90 overflow-hidden">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {line}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-green-500/50 align-middle ml-1"
                />
            </div>

            {/* Grid overlay for tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />
        </div>
    );
}
