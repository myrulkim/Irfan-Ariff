"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/lib/types";
import { trackClick } from "@/lib/actions/analytics";

export function ContactSection({
    profile,
    config
}: {
    profile: ProfileData | null;
    config?: Record<string, string>;
}) {
    if (!profile) return null;

    const whatsappNumber = config?.whatsapp_number || profile.whatsapp_number || "601111111111";

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            id="contact"
            className="w-full relative border border-white/10 bg-black overflow-hidden rounded-xl"
        >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Left Column: Status & Uplinks */}
                <div className="p-8 md:p-12 space-y-12 bg-neutral-950/30 backdrop-blur-sm">
                    {/* Header */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-500 font-mono text-sm">
                            <Terminal className="w-4 h-4" />
                            <span>~/initiate_contact.sh</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white">Let&apos;s Connect</h2>
                    </div>

                    {/* Status */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <span className="text-neutral-400 text-sm font-mono tracking-wide">STATUS: [ONLINE]</span>
                        </div>
                        <p className="text-neutral-300 leading-relaxed font-light">
                            {profile.availability_status || "Actively seeking Internship opportunities"}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-6">Priority Uplinks</h3>

                        {/* WhatsApp Priority Link */}
                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent("Hi Irfan, I'm interested in your freelance services.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                            onClick={() => trackClick("whatsapp_connect")}
                        >
                            <div className="flex items-center justify-between p-5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 hover:border-amber-500/50 transition-all duration-300 group-hover:translate-x-1 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden">
                                {/* Glassmorphism effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-2.5 rounded-md bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">WhatsApp Junction</span>
                                            <span className="text-[8px] sm:text-[9px] font-mono text-amber-500 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30 animate-pulse whitespace-nowrap w-fit">
                                                [ FAST_RESPONSE: FREELANCE_INQUIRY ]
                                            </span>
                                        </div>
                                        <span className="text-xs text-neutral-500 font-mono">Encrypted Chat Protocol</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300 relative z-10 shrink-0 hidden sm:block" />
                            </div>
                        </a>

                        {profile.github_url && (
                            <a
                                href={profile.github_url?.startsWith('http') ? profile.github_url : `https://${profile.github_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                                onClick={() => trackClick("github_view")}
                            >
                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                            <Github className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">GitHub</span>
                                            <span className="text-xs text-neutral-500 font-mono">Development Profile</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                                </div>
                            </a>
                        )}

                        {profile.linkedin_url && (
                            <a
                                href={profile.linkedin_url?.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                                onClick={() => trackClick("linkedin_view")}
                            >
                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-blue-600 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">LinkedIn</span>
                                            <span className="text-xs text-neutral-500 font-mono">Professional Network</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                                </div>
                            </a>
                        )}

                        {profile.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="block group"
                                onClick={() => trackClick("email_click")}
                            >
                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-red-500 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">Email</span>
                                            <span className="text-xs text-neutral-500 font-mono">Direct Transmission</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                                </div>
                            </a>
                        )}
                    </div>
                </div>

                {/* Right Column: Secure Transmission Form */}
                <div className="p-8 md:p-12 bg-black relative">
                    <ContactForm />
                </div>
            </div>
        </motion.section>
    );
}

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/lib/actions/send-email";

// Define the shape of the state
type ContactFormState = {
    success: boolean;
    message?: string;
    error?: string;
};

const initialState: ContactFormState = {
    success: false,
    message: "",
    error: ""
};

function ContactForm() {
    const [state, formAction] = useActionState(sendEmail, initialState);

    return (
        <>
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
            </div>

            <form action={formAction} className="space-y-6 h-full flex flex-col justify-center">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-1">Identity Name</label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="ENTER_NAME"
                            required
                            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 font-mono focus:border-white/20 focus:ring-0 rounded-none h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-1">Return Address (Email)</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="ENTER_EMAIL"
                            required
                            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 font-mono focus:border-white/20 focus:ring-0 rounded-none h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-1">Transmission Data</label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="TYPE_MESSAGE..."
                            required
                            className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 font-mono focus:border-white/20 focus:ring-0 rounded-none min-h-[150px] resize-none"
                        />
                    </div>
                </div>

                <SubmitButton />

                {state?.success && (
                    <p className="text-green-500 text-xs font-mono mt-2">
                        &gt; {state.message}
                    </p>
                )}
                {state?.error && (
                    <p className="text-red-500 text-xs font-mono mt-2">
                        &gt; ERROR: {state.error}
                    </p>
                )}
            </form>
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            className="w-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest h-12 border border-white/20 relative group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
            <span className={`relative z-10 flex items-center justify-center gap-2 ${pending ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                [ TRANSMIT_MESSAGE ]
            </span>

            {!pending && (
                <>
                    <div className="absolute inset-0 bg-neutral-900 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0" />
                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        [ SENDING... ]
                    </span>
                </>
            )}

            {pending && (
                <span className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-black animate-pulse">
                    [ TRANSMITTING... ]
                </span>
            )}
        </Button>
    );
}
