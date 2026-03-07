"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MobileShowcaseProps {
    primaryColor?: string; // e.g., "bg-blue-500"
    image1?: string; // Front image source
    image2?: string; // Back image source
    alt?: string; // Alternative text for images
    scale?: number; // Scale factor for the showcase
}

export function MobileShowcase({ primaryColor = "bg-neutral-800", image1, image2, alt = "Mobile App", scale = 1 }: MobileShowcaseProps) {
    return (
        <div className="flex items-center justify-center w-full h-[22rem] md:h-full min-h-[20rem] relative overflow-hidden group-hover/bento:cursor-pointer">
            {/* Background Glow */}
            <div className={cn("absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black transition-colors duration-500", primaryColor.replace("bg-", "from-").replace("-500", "-900"))} />

            {/* Inner Container for Fixed Positioning & Scaling */}
            <div
                className="relative w-[320px] h-[320px] flex items-center justify-center flex-shrink-0 origin-center"
                style={{ transform: `scale(${scale})` }}
            >
                {/* Frame 2 (Back) - Secondary Feature */}
                <motion.div
                    initial={{ y: -10, x: 20, rotate: 6 }}
                    animate={{ y: [-10, -15, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[140px] h-[240px] rounded-[32px] bg-neutral-900 border-4 border-neutral-800 shadow-2xl z-10 group-hover/bento:translate-x-8 group-hover/bento:-translate-y-4 transition-transform duration-500 right-8 top-12"
                >
                    <div className="w-full h-full bg-neutral-950 rounded-[28px] overflow-hidden relative">
                        {/* Mock Content or Image */}
                        {image2 ? (
                            <Image
                                src={image2}
                                alt={`${alt} Back`}
                                fill
                                sizes="150px"
                                className="object-cover object-top"
                            />
                        ) : (
                            <>
                                <div className="absolute top-0 w-full h-6 bg-neutral-800/50 flex justify-center items-center gap-1">
                                    <div className="w-10 h-3 bg-black rounded-full" />
                                </div>
                                <div className="p-4 space-y-2 mt-6">
                                    <div className="w-full h-20 bg-neutral-800/20 rounded-lg animate-pulse" />
                                    <div className="w-2/3 h-4 bg-neutral-800/20 rounded animate-pulse delay-75" />
                                    <div className="w-full h-24 bg-neutral-800/10 rounded-lg" />
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Frame 1 (Front) - Primary Feature */}
                <motion.div
                    initial={{ y: 10, x: -20, rotate: -3 }}
                    animate={{ y: [10, 5, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute w-[150px] h-[260px] rounded-[36px] bg-black border-[6px] border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 group-hover/bento:-translate-x-4 group-hover/bento:translate-y-2 transition-transform duration-500 left-8 bottom-4"
                >
                    <div className="w-full h-full bg-neutral-950 rounded-[30px] overflow-hidden relative border border-white/5">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-30" />
                        {/* Screen Content or Image */}
                        {image1 ? (
                            <Image
                                src={image1}
                                alt={`${alt} Front`}
                                fill
                                sizes="150px"
                                className="object-cover object-top"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col pt-8 px-3 relative">
                                <div className={cn("w-12 h-12 rounded-xl mb-3", primaryColor)} />
                                <div className="w-3/4 h-6 bg-neutral-800 rounded mb-2" />
                                <div className="w-1/2 h-4 bg-neutral-800/50 rounded mb-6" />

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-16 bg-neutral-900 rounded-lg border border-white/5" />
                                    <div className="h-16 bg-neutral-900 rounded-lg border border-white/5" />
                                    <div className="h-16 bg-neutral-900 rounded-lg border border-white/5 col-span-2" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
