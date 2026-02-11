"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Internship_Seeking",
        company: "Available for 2026",
        period: "2026",
        description: "Looking for opportunities to apply full-stack skills in a dynamic environment.",
        current: true,
    },
    {
        role: "Full Stack Developer",
        company: "Side Projects",
        period: "Present",
        description: "Building scalable web applications, including BenAwangHub and JomSujud. Utilizing Next.js, Supabase, and Flutter.",
        current: false,
    },
    {
        role: "Student",
        company: "Universiti Kuala Lumpur Malaysian Institute of Information Technology",
        period: "2023 - Present",
        description: "Pursuing Information Technology degree. Focused on software engineering and system architecture.",
        current: false,
    },
];

export function Experience() {
    return (
        <div className="relative border-l border-zinc-800 ml-3 space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8"
                >
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border border-black ${exp.current ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" : "bg-zinc-600"}`} />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                        <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-2 font-medium">{exp.company}</div>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
                        {exp.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
