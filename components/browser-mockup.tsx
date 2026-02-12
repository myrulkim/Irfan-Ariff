"use client";

import Image from "next/image";

interface BrowserMockupProps {
    appName?: string;
    url?: string;
    imageSrc?: string;
}

export function BrowserMockup({ appName = "Browser", url = "localhost:3000", imageSrc }: BrowserMockupProps) {
    return (
        <div className="w-full aspect-[16/10] md:aspect-auto md:h-full bg-neutral-900 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative group-hover/bento:scale-105 transition-transform duration-500">
            {/* Search Bar / Header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950/80 border-b border-white/5 backdrop-blur-sm">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 ml-4 h-5 bg-neutral-900 rounded flex items-center px-2 text-[10px] text-neutral-600 font-mono overflow-hidden">
                    <span className="truncate">{url}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full h-[calc(100%-36px)] relative bg-neutral-950 flex items-center justify-center">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={appName}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out"
                    />
                ) : (
                    <div className="text-neutral-800 text-sm font-mono">&lt;No Preview Available /&gt;</div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover/bento:bg-black/10 transition-colors duration-500" />
            </div>
        </div>
    );
}
