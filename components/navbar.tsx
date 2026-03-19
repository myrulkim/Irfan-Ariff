"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavLink = {
    name: string;
    href?: string;
    dropdown?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
    { name: "[ 01. services ]", href: "#services" },
    { name: "[ 02. projects ]", href: "#projects" },
    { name: "[ 03. experience ]", href: "#experience" },
    {
        name: "[ 04. archives ]",
        dropdown: [
            { name: "├── education/", href: "#education" },
            { name: "└── certificates/", href: "#certificates" },
        ],
    },
    { name: "[ 05. contact ]", href: "#contact" },
];

import { ProfileData } from "@/lib/types";

export function Navbar({ profile }: { profile: ProfileData | null }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled
                        ? "bg-black/60 backdrop-blur-lg border-white/10 py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            <div className="font-mono text-lg tracking-tight font-bold">
                                <span className="text-green-500 mr-1">&gt;</span>
                                <span className="text-white group-hover:text-green-400 transition-colors">irfanrff.</span>
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                                    className="inline-block w-2.5 h-5 bg-green-500 ml-1 align-middle"
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <div className="flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    link.dropdown ? (
                                        <div key={link.name} className="relative group cursor-pointer font-mono text-sm text-neutral-400 hover:text-green-400 transition-colors">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
                                            
                                            <div className="absolute top-full right-0 mt-4 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="absolute -top-4 right-0 w-full h-4 bg-transparent" />
                                                <div className="text-[10px] text-green-500/50 mb-2 px-3 uppercase tracking-widest mt-1">~/archives</div>
                                                {link.dropdown.map((subLink) => (
                                                    <a
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        onClick={(e) => scrollToSection(e, subLink.href)}
                                                        className="block px-3 py-2 text-neutral-400 hover:text-green-400 hover:bg-white/5 rounded transition-colors whitespace-nowrap"
                                                    >
                                                        {subLink.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href!}
                                            onClick={(e) => scrollToSection(e, link.href!)}
                                            className="relative group font-mono text-sm text-neutral-400 hover:text-green-400 transition-colors"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* Sticky CV Button - Appears on scroll */}
                            <AnimatePresence>
                                {isScrolled && (
                                    <motion.a
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        href="/my-cv.pdf"
                                        target="_blank"
                                        className="px-4 py-2 bg-green-500 text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded hover:bg-green-400 transition-colors"
                                    >
                                        [ CV ]
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button / CV Combo */}
                        <div className="md:hidden flex items-center gap-4">
                            <AnimatePresence>
                                {isScrolled && (
                                    <motion.a
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        href="/my-cv.pdf"
                                        target="_blank"
                                        className="px-3 py-1.5 bg-green-500 text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded"
                                    >
                                        CV
                                    </motion.a>
                                )}
                            </AnimatePresence>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="text-white hover:bg-white/10"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 origin-left z-50 pointer-events-none"
                    style={{ scaleX }}
                />
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white hover:bg-white/10 hover:text-red-400"
                        >
                            <X className="h-8 w-8" />
                            <span className="sr-only">Close menu</span>
                        </Button>

                        <nav className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm px-6">
                            {navLinks.map((link, index) => (
                                link.dropdown ? (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex flex-col items-center gap-4 w-full"
                                    >
                                        <div className="font-mono text-2xl text-green-500/70 tracking-wide">
                                            {link.name}
                                        </div>
                                        <div className="flex flex-col items-start gap-4 text-left ml-4 bg-white/5 p-4 rounded-xl border border-white/5 w-full">
                                            {link.dropdown.map((subLink) => (
                                                <a
                                                    key={subLink.name}
                                                    href={subLink.href}
                                                    onClick={(e) => scrollToSection(e, subLink.href)}
                                                    className="font-mono text-lg text-neutral-400 hover:text-green-400 transition-colors tracking-wide w-full"
                                                >
                                                    {subLink.name}
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.a
                                        key={link.name}
                                        href={link.href!}
                                        onClick={(e) => scrollToSection(e, link.href!)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="font-mono text-2xl text-white hover:text-green-400 transition-colors tracking-wide"
                                    >
                                        {link.name}
                                    </motion.a>
                                )
                            ))}
                        </nav>

                        <div className="absolute bottom-10 text-neutral-500 font-mono text-xs">
                            <span className="text-green-500">&gt;</span> {profile?.availability_status || "SYSTEM.READY"}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
