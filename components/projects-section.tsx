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

    useEffect(() => {
        const handleScrollToProject = (e: CustomEvent<{ slug: string }>) => {
            const { slug } = e.detail;

            // Expand projects if the target is hidden
            const targetInExpanded = projects.slice(3).some(p => p.slug === slug);
            if (targetInExpanded && !isExpanded) {
                setIsExpanded(true);
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
    }, [isExpanded, projects]);

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
        if (project.category === 'mobile') {
            return <MobileShowcase
                primaryColor="bg-emerald-500"
                image1={project.image_primary || undefined}
                image2={project.image_secondary || undefined}
                alt={project.title}
                scale={isLatest ? 1.8 : 1.25}
            />;
        }
        return <BrowserMockup
            appName={project.title}
            url={project.live_url || project.github_url || `${project.slug}.dev`}
            imageSrc={project.image_primary || undefined}
        />;
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
                <BentoGrid className="md:auto-rows-[minmax(22rem,_auto)]">
                    {visibleProjects.map((project, index) => {
                        const isLatest = project.is_latest;
                        const className = isLatest ? "md:col-span-2 md:row-span-2 border-white/10 bg-neutral-900/50 backdrop-blur-md" : "md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md";

                        return (
                            <BentoGridItem
                                key={project.id}
                                id={project.slug}
                                className={className}
                                header={
                                    <>
                                        {isLatest && <LatestBadge />}
                                        {renderHeader(project, isLatest)}
                                    </>
                                }
                                title={<ProjectHeader title={project.title} extension={getExtensionForCategory(project.category)} />}
                                description={<span className="text-neutral-400 text-sm whitespace-pre-line">{project.description}</span>}
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
                        );
                    })}

                    <AnimatePresence mode="popLayout">
                        {isExpanded && expandedProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="md:col-span-1 row-span-1 h-full show-overflow"
                            >
                                <BentoGridItem
                                    id={project.slug}
                                    className="h-full border-white/10 bg-neutral-900/50 backdrop-blur-md"
                                    header={renderHeader(project, false)}
                                    title={<ProjectHeader title={project.title} extension={getExtensionForCategory(project.category)} />}
                                    description={<span className="text-neutral-400 text-sm whitespace-pre-line">{project.description}</span>}
                                    icon={getIconForCategory(project.category)}
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
                        ))}
                    </AnimatePresence>
                </BentoGrid>

                {/* Gradient Mask */}
                <AnimatePresence>
                    {!isExpanded && projects.length > 3 && (
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
            {projects.length > 3 && (
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
            )}
        </section>
    );
}
