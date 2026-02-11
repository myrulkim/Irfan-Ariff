"use client";

import { Command } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl w-[300px] hover:border-white/20 transition-colors cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <span className="text-zinc-400 text-sm flex items-center gap-2">
                    <Command className="w-4 h-4" />
                    Type a command...
                </span>
                <div className="flex items-center gap-1">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center border-b border-zinc-800 px-3">
                                <Command className="mr-2 h-4 w-4 shrink-0 opacity-50 text-zinc-400" />
                                <input
                                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    placeholder="What do you need?"
                                    autoFocus
                                />
                            </div>
                            <div className="p-2">
                                <div className="px-2 py-1.5 text-xs font-medium text-zinc-500">Suggestions</div>
                                <div className="group flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors">
                                    <span>Copy Email</span>
                                    <span className="ml-auto text-xs text-zinc-600">muhdnurirfanmohdariff@gmail.com</span>
                                </div>
                                <div className="group flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors">
                                    <span>View Resume</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
