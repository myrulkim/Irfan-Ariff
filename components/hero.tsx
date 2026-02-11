"use client";

import { motion, Variants } from "framer-motion";

const typewriterVariants: Variants = {
    hidden: { width: "0%" },
    visible: {
        width: "100%",
        transition: {
            duration: 2,
            ease: "linear",
        },
    },
};

const blinkVariants: Variants = {
    blink: {
        opacity: [0, 1, 0],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

export function Hero() {


    return (
        <div className="w-full max-w-4xl mx-auto py-20 flex flex-col justify-center items-start space-y-6 font-mono">
            <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-500">
                <span className="text-green-500">➜</span>
                <span>~/portfolio</span>
                <span className="text-gray-600">git:(main)</span>
            </div>

            <div className="space-y-4">
                {/* Line 1 */}
                <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="text-blue-400">const</span>
                    <span className="text-yellow-400">user</span>
                    <span className="text-gray-400">=</span>
                    <div className="relative inline-flex items-center">
                        <span className="text-green-400">&quot;Irfan Ariff&quot;</span>
                    </div>
                    <span className="text-gray-400">;</span>
                </div>

                {/* Line 2 with typing effect */}
                <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight min-h-[3rem]">
                    <span className="text-blue-400">const</span>
                    <span className="text-yellow-400">status</span>
                    <span className="text-gray-400">=</span>
                    <div className="relative inline-flex items-center overflow-hidden whitespace-nowrap">
                        <motion.span
                            variants={typewriterVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-orange-400 overflow-hidden inline-block align-bottom"
                        >
                            &quot;Internship_Seeking_2026&quot;
                        </motion.span>
                        <motion.span
                            variants={blinkVariants}
                            animate="blink"
                            className="inline-block w-[10px] h-[1.5em] bg-white ml-1 align-bottom"
                        />
                    </div>
                    <span className="text-gray-400">;</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="mt-8 text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed font-sans"
            >
                <p>
                    Need a developer who speaks in code but thinks in solutions? I build high-performance web applications with modern tech stacks.
                </p>
            </motion.div>
        </div>
    );
}
