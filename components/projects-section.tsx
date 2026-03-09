"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Smartphone, Globe, Database, Layers, Wallet } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectHeader } from "@/components/project-header";

import { LatestBadge } from "@/components/latest-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectData } from "@/lib/types";

interface ProjectsSectionProps {
    projects: ProjectData[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('mobile');

    useEffect(() => {
        const handleScrollToProject = (e: CustomEvent<{ slug: string }>) => {
            const { slug } = e.detail;

            // Expand projects if the target is hidden
            const targetIndex = projects.findIndex(p => p.slug === slug);
            if (targetIndex >= 3 && !isExpanded) {
                setIsExpanded(true);
            }

            const targetProject = projects.find(p => p.slug === slug);
            if (targetProject && targetProject.category !== activeFilter) {
                setActiveFilter(targetProject.category);
            }

            // Small delay to allow AnimatePresence / re-render to complete
            setTimeout(() => {
                const el = document.getElementById(slug);
                if (el) {
                    const offset = 80; // Offset for navbar
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Add ping effect
                    el.classList.add("project-ping");
                    setTimeout(() => {
                        el.classList.remove("project-ping");
                    }, 1500);
                }
            }, 150);
        };

        window.addEventListener("scrollToProject" as any, handleScrollToProject);
        return () => window.removeEventListener("scrollToProject" as any, handleScrollToProject);
    }, [isExpanded, projects, activeFilter]);

    // If projects is empty from DB
    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">~/projects</span>
                    <span className="text-gray-600">ls -la</span>
                </h2>
                <div className="w-full h-64 border border-white/5 rounded-2xl flex items-center justify-center bg-neutral-900/40 text-neutral-400 font-mono text-sm">
                    &gt; No active projects returned from database.
                </div>
            </section>
        );
    }

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'mobile': return <Smartphone className="h-4 w-4 text-emerald-500" />;
            case 'system': return <Terminal className="h-4 w-4 text-green-500" />;
            case 'web':
            default: return <Globe className="h-4 w-4 text-blue-500" />;
        }
    };

    const getExtensionForCategory = (category: string) => {
        switch (category) {
            case 'mobile': return '.dart';
            case 'system': return '.rs';
            case 'web':
            default: return '.tsx';
        }
    };

    const renderHeader = (project: ProjectData, isLatest?: boolean) => {
        const descriptiveAlt = `${project.title} - ${project.category} application interface developed using ${project.tech_stack.join(', ')}`;

        if (project.category === 'mobile') {
            return <MobileShowcase
                primaryColor="bg-emerald-500"
                image1={project.image_primary || undefined}
                image2={project.image_secondary || undefined}
                alt={descriptiveAlt}
                scale={isLatest ? 1.25 : 0.65} // Drastically reduced for single-row cards
            />;
        }
        return <BrowserMockup
            appName={project.title}
            url={project.live_url || project.github_url || `${project.slug}.dev`}
            imageSrc={project.image_primary || undefined}
            alt={descriptiveAlt}
        />;
    };

    const flagshipBreakdowns: Record<string, string> = {
        'saf': 'Solved mosque community engagement gaps by implementing a unified notification system and a real-time activity dashboard using Next.js and Firebase.',
        'jom-sujud': 'Engineered a high-performance prayer time engine specifically optimized for local SME integration, utilizing Supabase for real-time data sync.',
        'raia-studio': 'Architected a luxury e-commerce experience for an artisan brand, focusing on high-conversion UI and seamless payment integration via Stripe.'
    };

    const getBadgeStyle = (index: number) => {
        const variants = [
            "text-[10px] border-white/20 text-white",
            "text-[10px] border-green-900/50 text-green-500",
            "text-[10px] border-cyan-900/50 text-cyan-500",
            "text-[10px] border-blue-900/50 text-blue-500",
            "text-[10px] border-purple-900/50 text-purple-500",
            "text-[10px] border-orange-900/50 text-orange-500",
            "text-[10px] border-yellow-900/50 text-yellow-500",
            "text-[10px] border-pink-900/50 text-pink-500"
        ];
        return variants[index % variants.length];
    };

    const filters = [
        { id: 'mobile', label: 'mobile', number: '01' },
        { id: 'system', label: 'system', number: '02' },
        { id: 'web', label: 'web', number: '03' }
    ];

    const filteredProjects = projects.filter(p => p.category === activeFilter);

    const displayProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 3);
    const hasMore = filteredProjects.length > 3;

    return (
        <section id="projects" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">~/projects</span>
                    <span className="text-gray-600">ls -la</span>
                </h2>

                <div className="flex flex-wrap items-center gap-2 bg-neutral-900/40 rounded-lg p-1 border border-white/5 backdrop-blur-sm">
                    {filters.map(filter => {
                        const isActive = activeFilter === filter.id;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => {
                                    if (!isActive) {
                                        setActiveFilter(filter.id);
                                        setIsExpanded(false);
                                    }
                                }}
                                className={cn(
                                    "px-3 py-1.5 font-mono text-xs md:text-sm transition-all rounded-md relative outline-none",
                                    isActive
                                        ? "text-green-400 font-bold"
                                        : "text-neutral-500 hover:text-green-500/80 hover:bg-white/5"
                                )}
                            >
                                <span className="relative z-10">[ {filter.number}. {filter.label} ]</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilterBg"
                                        className="absolute inset-0 border border-green-500/30 bg-green-500/10 rounded-md shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="relative">
                <BentoGrid className="md:auto-rows-[18rem]">
                    <AnimatePresence mode="popLayout">
                        {displayProjects.map((project, index) => {
                            const isLatest = project.is_latest;
                            const gridSpanClass = isLatest ? "md:col-span-2 md:row-span-2" : "md:col-span-1";
                            const bentoClass = "border-white/10 bg-neutral-900/50 backdrop-blur-md h-full";
                            const breakdown = flagshipBreakdowns[project.slug];

                            return (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                    className={cn(gridSpanClass, "h-full show-overflow origin-center")}
                                >
                                    <BentoGridItem
                                        id={project.slug}
                                        className={bentoClass}
                                        header={
                                            <>
                                                {isLatest && <LatestBadge />}
                                                {renderHeader(project, isLatest)}
                                            </>
                                        }
                                        title={<ProjectHeader title={project.title} extension={getExtensionForCategory(project.category)} />}
                                        description={
                                            <div className="space-y-4">
                                                <span className="text-neutral-400 text-sm whitespace-pre-line block">{project.description}</span>
                                                {breakdown && (
                                                    <div className="pt-2 border-t border-white/5 space-y-1">
                                                        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block opacity-70">
                                                            // technical_breakdown.log
                                                        </span>
                                                        <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                                                            {breakdown}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        icon={getIconForCategory(project.category)}
                                        isLatest={isLatest}
                                    >
                                        {project.tech_stack && project.tech_stack.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {project.tech_stack.map((tech, i) => (
                                                    <Badge key={i} variant="outline" className={getBadgeStyle(i)}>
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </BentoGridItem>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </BentoGrid>

                {/* Gradient Mask */}
                <AnimatePresence>
                    {!isExpanded && hasMore && (
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
            <AnimatePresence>
                {hasMore && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex justify-center pt-4 relative z-20"
                    >
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
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

