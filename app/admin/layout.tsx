"use client";

import { ReactNode } from 'react';
import { Terminal, LayoutDashboard, Briefcase, FileCode2, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FileCode2 },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Education', href: '/admin/education', icon: Briefcase },
    { name: 'Certificates', href: '/admin/certificates', icon: Briefcase },
    { name: 'Tech Stack', href: '/admin/tech-stack', icon: Terminal },
    { name: 'Profile', href: '/admin/profile', icon: User },
    { name: 'Config', href: '/admin/config', icon: Terminal },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-black text-neutral-300 font-mono w-full absolute inset-0 z-50 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-neutral-950/50 flex flex-col items-center py-8">
                <div className="flex items-center gap-3 mb-10 w-full px-6">
                    <Terminal className="w-6 h-6 text-green-500" />
                    <h1 className="text-sm font-bold tracking-widest text-white">
                        [ ADMIN_TERM ]
                    </h1>
                </div>

                <nav className="flex-1 w-full space-y-2 px-4">
                    {adminLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.name} href={link.href} className="block w-full">
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all w-full",
                                    isActive
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent"
                                )}>
                                    <Icon className="w-4 h-4" />
                                    {link.name}
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                <div className="w-full px-4 mb-6">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-red-500/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </button>
                </div>

                <div className="w-full px-6 flex items-center gap-2 text-[10px] text-green-500/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    SECURE_LINK
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 lg:p-12 min-h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
