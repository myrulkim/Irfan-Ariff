"use client";

import Image from "next/image";

interface BrowserMockupProps {
    appName?: string;
    url?: string;
    imageSrc?: string;
    alt?: string;
    children?: React.ReactNode;
}

export function BrowserMockup({ appName = "Browser", url = "localhost:3000", imageSrc, alt, children }: BrowserMockupProps) {
    return (
        <div className="w-full h-full min-h-[14rem] md:min-h-[10rem] bg-neutral-900 rounded-xl flex flex-col overflow-hidden shadow-2xl relative group-hover/bento:scale-[1.02] transition-transform duration-500 origin-center border border-white/5">
            {/* Search Bar / Header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950/80 border-b border-white/5 backdrop-blur-sm z-10 shrink-0">
                <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 max-w-full h-5 bg-neutral-900 rounded flex items-center px-2 text-[10px] text-neutral-600 font-mono overflow-hidden">
                    <span className="truncate">{url}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full flex-1 relative bg-neutral-950">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={alt || `${appName} - Project Screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 ease-out"
                    />
                ) : children ? (
                    children
                ) : (
                    <div className="text-neutral-800 text-sm font-mono flex items-center justify-center w-full h-full">&lt;No Preview Available /&gt;</div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover/bento:bg-black/10 transition-colors duration-500 pointer-events-none" />
            </div>
        </div>
    );
}
