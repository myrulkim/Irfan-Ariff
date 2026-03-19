"use client";

import { motion } from "framer-motion";
import { CertificateData } from "@/lib/types";
import { Award, ShieldCheck, Code, BookOpen, Star, Medal } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
    award: <Award className="w-5 h-5 text-green-400" />,
    shield: <ShieldCheck className="w-5 h-5 text-green-400" />,
    code: <Code className="w-5 h-5 text-green-400" />,
    book: <BookOpen className="w-5 h-5 text-green-400" />,
    star: <Star className="w-5 h-5 text-green-400" />,
    medal: <Medal className="w-5 h-5 text-green-400" />
};

export function CertificatesSection({ certificates }: { certificates: CertificateData[] }) {
    if (!certificates || certificates.length === 0) return null;

    return (
        <section className="w-full relative z-10 py-12 md:py-20 lg:py-24">
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
                            [ CREDENTIALS ]
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
                    {certificates.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-neutral-950/80 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-green-500/30 transition-colors group relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {iconMap[item.icon_tag] || iconMap.award}
                            </div>

                            <div className="relative z-10">
                                <div className="p-3 bg-black/50 border border-white/10 rounded-xl w-fit mb-4">
                                    {iconMap[item.icon_tag] || iconMap.award}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1 leading-tight group-hover:text-green-400 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="text-neutral-500 text-sm mb-4">
                                    {item.issuer} • {item.issue_date}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                                {item.credential_url ? (
                                    <Link 
                                        href={item.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs font-bold text-neutral-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg"
                                    >
                                        [ VERIFY ]
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center text-xs text-neutral-600 px-4 py-2">
                                        INTERNAL_LOG
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
