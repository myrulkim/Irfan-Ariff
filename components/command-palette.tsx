"use client";

import { Command, Check, FileText, Mail, MessageSquare, Github, Linkedin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackClick } from "@/lib/actions/analytics";
import { copyToClipboard } from "@/lib/utils";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const commands = [
        {
            id: 'email',
            label: 'Copy Email',
            value: 'mnifanmohdariff@gmail.com',
            icon: Mail,
            action: async () => {
                const success = await copyToClipboard("mnifanmohdariff@gmail.com");
                if (success) {
                    setCopied(true);
                    trackClick("copy_email");
                    setTimeout(() => setCopied(false), 2000);
                }
            }
        },
        {
            id: 'resume',
            label: 'View Resume',
            value: 'PDF',
            icon: FileText,
            action: () => {
                trackClick("view_resume");
                window.open("/my-cv.pdf", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'github',
            label: 'GitHub Profile',
            value: 'github.com/irfanng',
            icon: Github,
            action: () => {
                trackClick("github_view");
                window.open("https://github.com/irfanng", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'linkedin',
            label: 'LinkedIn Profile',
            value: 'LinkedIn',
            icon: Linkedin,
            action: () => {
                trackClick("linkedin_view");
                window.open("https://www.linkedin.com/in/irfan-ariff-20691a264", "_blank");
                setOpen(false);
            }
        },
        {
            id: 'whatsapp',
            label: 'Connect WhatsApp',
            value: 'Direct Uplink',
            icon: MessageSquare,
            action: () => {
                trackClick("whatsapp_connect");
                window.open("https://wa.me/60183823063", "_blank");
                setOpen(false);
            }
        }
    ];

    return (
        <>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setOpen(!open)}
                className="fixed bottom-10 right-10 z-50 flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer group"
            >
                <Command className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                
                {/* Tooltip */}
                <span className="absolute right-14 px-3 py-1 bg-zinc-900 border border-white/5 rounded text-[10px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                    Open_Terminal (⌘K)
                </span>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-lg bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center border-b border-white/5 px-4 bg-white/[0.02]">
                                <Command className="mr-3 h-4 w-4 shrink-0 text-cyan-500" />
                                <input
                                    className="flex h-14 w-full rounded-md bg-transparent py-4 font-mono text-[11px] uppercase tracking-widest outline-none placeholder:text-zinc-700 text-white"
                                    placeholder="Execute_Command..."
                                    autoFocus
                                />
                                <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-zinc-500">
                                    ESC
                                </kbd>
                            </div>
                            
                            <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                                <div className="px-3 py-2 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Operational_Uplinks</div>
                                
                                <div className="space-y-1">
                                    {commands.map((cmd) => (
                                        <div
                                            key={cmd.id}
                                            onClick={cmd.action}
                                            className="group flex cursor-pointer items-center px-3 py-3 hover:bg-white/5 transition-all duration-200"
                                        >
                                            <div className="mr-4 flex h-8 w-8 items-center justify-center bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
                                                <cmd.icon className="h-4 w-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                            
                                            <div className="flex flex-col">
                                                <span className="font-sans font-bold text-sm text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">
                                                    {cmd.id === 'email' && copied ? "TRANSFERRED_TO_CLIPBOARD" : cmd.label}
                                                </span>
                                                <span className="font-mono text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-widest">
                                                    {cmd.value}
                                                </span>
                                            </div>

                                            <div className="ml-auto">
                                                {cmd.id === 'email' && copied ? (
                                                    <Check className="h-4 w-4 text-cyan-500" />
                                                ) : (
                                                    <ExternalLink className="h-3 w-3 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-white/5 bg-white/[0.01] px-4 py-3 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <kbd className="h-4 w-4 flex items-center justify-center rounded bg-zinc-900 border border-white/10 text-[8px] text-zinc-500">↑</kbd>
                                        <kbd className="h-4 w-4 flex items-center justify-center rounded bg-zinc-900 border border-white/10 text-[8px] text-zinc-500">↓</kbd>
                                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <kbd className="h-4 px-1 flex items-center justify-center rounded bg-zinc-900 border border-white/10 text-[8px] text-zinc-500">ENTER</kbd>
                                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Execute</span>
                                    </div>
                                </div>
                                <span className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-[0.2em]">Alchimistra_V3.1_Core</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
