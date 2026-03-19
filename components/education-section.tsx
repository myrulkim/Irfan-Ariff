"use client";

import { motion } from "framer-motion";
import { EducationData } from "@/lib/types";

export function EducationSection({ education }: { education: EducationData[] }) {
    if (!education || education.length === 0) return null;

    return (
        <section id="education" className="w-full relative z-10 py-12 md:py-20 lg:py-24">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 sm:w-12 bg-green-500/50" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-white tracking-widest uppercase">
                            [ ACADEMIC_LOGS ]
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                    </div>
                </motion.div>

                <div className="space-y-8 font-mono">
                    {education.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black/40 border border-white/10 rounded-xl p-6 hover:bg-white/[0.02] transition-colors relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 group-hover:bg-green-500 transition-colors" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-lg md:text-xl font-bold text-white">
                                            &gt; {item.institution}
                                        </h3>
                                        <span className="text-green-500/70 hidden md:inline">|</span>
                                        <span className="text-green-400 font-semibold">{item.degree}</span>
                                    </div>
                                    <div className="text-neutral-500 text-sm mb-4">
                                        [{item.duration}] {item.is_current && <span className="text-green-500/70 ml-2 animate-pulse">[ACTIVE_STUDIES]</span>}
                                    </div>

                                    {item.details && item.details.length > 0 && (
                                        <ul className="space-y-2 mt-4 ml-4">
                                            {item.details.map((detail, idx) => (
                                                <li key={idx} className="text-neutral-400 text-sm flex gap-3 leading-relaxed">
                                                    <span className="text-green-500/50 shrink-0 mt-0.5">↳</span>
                                                    <span className="group-hover:text-neutral-300 transition-colors">
                                                        {detail}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
