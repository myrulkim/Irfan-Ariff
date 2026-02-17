"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Smartphone, Globe, Database, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectHeader } from "@/components/project-header";
import { TerminalShowcase } from "@/components/terminal-showcase";
import { LatestBadge } from "@/components/latest-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
    title: string;
    extension: string;
    description: ReactNode;
    header: ReactNode;
    icon: ReactNode;
    className?: string; // For grid spans
    badges: { text: string; className: string; variant?: "default" | "secondary" | "destructive" | "outline" }[];
}

export function ProjectsSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    const projects: Project[] = [
        {
            // 1. Vanguard Terminal (Latest)
            title: "Vanguard",
            extension: ".tsx",
            description: <span className="text-neutral-400 text-sm">Real-time Website Audits System.</span>,
            header: <BrowserMockup appName="Vanguard" url="vanguard-terminal.com"><TerminalShowcase hideHeader className="min-h-0 bg-neutral-950" /></BrowserMockup>,
            icon: <Terminal className="h-4 w-4 text-green-500" />,
            className: "md:col-span-2 md:row-span-2 border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Next.js 16", className: "text-[10px] border-green-900/50 text-green-500", variant: "outline" },
                { text: "Xterm.js", className: "text-[10px] border-blue-900/50 text-blue-500", variant: "outline" },
                { text: "PSI API", className: "text-[10px] border-purple-900/50 text-purple-500", variant: "outline" },
            ]
        },
        {
            // 2. CutiMate
            title: "CutiMate",
            extension: ".dart",
            description: <span className="text-neutral-400 text-sm">Holiday Planner With Group Voting.</span>,
            header: <MobileShowcase primaryColor="bg-orange-500" image1="/Cutimate1.png" image2="/Cutimate2.png" alt="CutiMate App" />,
            icon: <Globe className="h-4 w-4 text-orange-500" />,
            className: "md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Flutter", className: "text-[10px] border-blue-900/50 text-blue-500", variant: "outline" },
                { text: "Firebase", className: "text-[10px] border-yellow-900/50 text-yellow-500", variant: "outline" },
                { text: "Places API", className: "text-[10px] border-green-900/50 text-green-500", variant: "outline" },
            ]
        },
        {
            // 3. JomSujud
            title: "JomSujud",
            extension: ".dart",
            description: <span className="text-neutral-400 text-sm">Iconic Mosque Locator & Prayer Times App.</span>,
            header: <MobileShowcase primaryColor="bg-emerald-500" image1="/JomSujud1.png" image2="/JomSujud2.png" alt="JomSujud App" />,
            icon: <Smartphone className="h-4 w-4 text-emerald-500" />,
            className: "md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Flutter", className: "bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/30", variant: "secondary" },
                { text: "Places API", className: "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30", variant: "secondary" }
            ]
        },
        {
            // 4. BinaPintar
            title: "BinaPintar",
            extension: ".sql",
            description: <span className="text-neutral-400 text-sm">Smart Construction CMS.</span>,
            header: <BrowserMockup appName="BinaPintar" url="cms.binapintar.com" imageSrc="/BinaPintar.png" />,
            icon: <Database className="h-4 w-4 text-orange-500" />,
            className: "md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Supabase", className: "text-[10px] border-orange-900/50 text-orange-500", variant: "outline" },
                { text: "CMS", className: "text-[10px] border-yellow-900/50 text-yellow-500", variant: "outline" },
            ]
        },
        {
            // 5. Qalam Irma
            title: "Qalam Irma",
            extension: ".tsx",
            description: <span className="text-neutral-400 text-sm">Business landing page.</span>,
            header: <BrowserMockup appName="Qalam Irma" url="qalamirma.com" imageSrc="/Qalam Irma.png" />,
            icon: <Layers className="h-4 w-4 text-indigo-500" />,
            className: "h-full border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Next.js", className: "text-[10px] border-indigo-900/50 text-indigo-500", variant: "outline" },
                { text: "SEO", className: "text-[10px] border-pink-900/50 text-pink-500", variant: "outline" },
            ]
        },
        {
            // 6. HabibahKamal
            title: "HabibahKamal",
            extension: ".tsx",
            description: <span className="text-neutral-400 text-sm">Personal Brand Landing Page.</span>,
            header: <BrowserMockup appName="HabibahKamal" url="habibahkamal.com" imageSrc="/HabibahKamal.png" />,
            icon: <Globe className="h-4 w-4 text-pink-500" />,
            className: "h-full border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Next.js", className: "text-[10px] border-pink-900/50 text-pink-500", variant: "outline" },
                { text: "Framer Motion", className: "text-[10px] border-purple-900/50 text-purple-500", variant: "outline" },
            ]
        },
        {
            // 7. BenAwangHub
            title: "BenAwangHub",
            extension: ".tsx",
            description: <span className="text-neutral-400 text-sm">Community Hub/Family Event Management.</span>,
            header: <MobileShowcase primaryColor="bg-blue-500" image1="/BenAwangHub1.png" image2="/BenAwangHub2.png" alt="BenAwangHub App" />,
            icon: <Globe className="h-4 w-4 text-neutral-500" />,
            className: "h-full border-white/10 bg-neutral-900/50 backdrop-blur-md",
            badges: [
                { text: "Flutter", className: "text-[10px] border-blue-900/50 text-blue-500", variant: "outline" },
                { text: "Firebase", className: "text-[10px] border-green-900/50 text-green-500", variant: "outline" },
            ]
        }
    ];

    const visibleProjects = projects.slice(0, 3);
    const expandedProjects = projects.slice(3);

    return (
        <section id="projects" className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-500" />
                <span className="text-green-500">~/projects</span>
                <span className="text-gray-600">ls -la</span>
            </h2>

            <div className="relative">
                <BentoGrid className="md:auto-rows-[22rem]">
                    {visibleProjects.map((project, index) => {
                        const isLatest = index === 0;
                        return (
                            <BentoGridItem
                                key={project.title}
                                className={project.className}
                                header={
                                    <>
                                        {isLatest && <LatestBadge />}
                                        {project.header}
                                    </>
                                }
                                title={<ProjectHeader title={project.title} extension={project.extension} />}
                                description={project.description}
                                icon={project.icon}
                                isLatest={isLatest}
                            >
                                {project.badges.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {project.badges.map((badge, i) => (
                                            <Badge key={i} variant={badge.variant} className={badge.className}>
                                                {badge.text}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </BentoGridItem>
                        );
                    })}

                    <AnimatePresence mode="popLayout">
                        {isExpanded && expandedProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="md:col-span-1 row-span-1"
                            >
                                <BentoGridItem
                                    className={project.className}
                                    header={project.header}
                                    title={<ProjectHeader title={project.title} extension={project.extension} />}
                                    description={project.description}
                                    icon={project.icon}
                                >
                                    {project.badges.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {project.badges.map((badge, i) => (
                                                <Badge key={i} variant={badge.variant} className={badge.className}>
                                                    {badge.text}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </BentoGridItem>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </BentoGrid>

                {/* Gradient Mask */}
                <AnimatePresence>
                    {!isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center pt-4 relative z-20">
                <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="border-green-900/30 text-green-500 hover:text-green-400 hover:bg-green-950/30 hover:border-green-500/50 transition-all font-mono text-xs tracking-wider"
                >
                    {isExpanded ? (
                        <>
                            [ SHOW_LESS ]
                        </>
                    ) : (
                        <>
                            [ LS_ALL_FILES ]
                        </>
                    )}
                </Button>
            </div>
        </section>
    );
}
