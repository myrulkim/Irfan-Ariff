"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
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
                            Currently <span className="text-white font-medium">actively seeking Internship opportunities</span> for the 2026 intake. Open to collaborations and freelance work.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-6">Direct Uplinks</h3>

                        <a href="https://github.com/IrfanNG" target="_blank" rel="noopener noreferrer" className="block group">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">GitHub</span>
                                        <span className="text-xs text-neutral-500 font-mono">gh/irfanNG</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/irfan-ariff-20691a264/" target="_blank" rel="noopener noreferrer" className="block group">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-blue-600 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">LinkedIn</span>
                                        <span className="text-xs text-neutral-500 font-mono">in/Nur Irfan</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                            </div>
                        </a>

                        <a href="mailto:mnifanmohdariff@gmail.com" className="block group">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-md bg-neutral-800 text-white group-hover:bg-red-500 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">Email</span>
                                        <span className="text-xs text-neutral-500 font-mono">mnifanmohdariff@gmail.com</span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                            </div>
                        </a>
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
