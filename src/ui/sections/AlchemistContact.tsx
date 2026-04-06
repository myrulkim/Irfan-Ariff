"use client";

import { motion } from "framer-motion";
import { ProfileData } from "@/lib/types";
import { ArrowRight } from "lucide-react";
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

interface AlchemistContactProps {
  profile: ProfileData | null;
}

export function AlchemistContact({ profile }: AlchemistContactProps) {
  const [state, formAction] = useActionState(sendEmail, initialState);

  return (
    <section id="contact" className="w-full py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="flex flex-col gap-24">
        <h2 className="font-sans font-black text-6xl md:text-[12vw] uppercase tracking-tighter text-white leading-[0.8]">
          Let&apos;s <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Transmute</span> <br />
          The Future.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <p className="font-sans text-2xl text-zinc-400 max-w-md leading-tight">
              Alchimistra is currently accepting elite collaborations. Ready to architect your next mutation?
            </p>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase">Neural_Link</span>
              <a href={`mailto:${profile?.email}`} className="font-sans font-black text-2xl md:text-4xl text-white hover:text-cyan-500 transition-colors break-all">
                {profile?.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-12 p-8 md:p-12 bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
            <form action={formAction} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-10px text-zinc-400 uppercase tracking-widest">Identify_Self</label>
                <input id="name" name="name" required type="text" placeholder="NAME / ORGANIZATION" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all placeholder:text-zinc-700" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-10px text-zinc-400 uppercase tracking-widest">Comm_Protocol</label>
                <input id="email" name="email" required type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all placeholder:text-zinc-700" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-10px text-zinc-400 uppercase tracking-widest">Mission_Brief</label>
                <textarea id="message" name="message" required rows={4} placeholder="DESCRIBE YOUR VISION" className="w-full bg-transparent border-b border-white/10 py-4 font-sans font-bold text-white outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-zinc-700" />
              </div>
              
              <SubmitButton />

              {state?.success && (
                  <p className="text-cyan-500 text-xs font-mono mt-2 animate-pulse">
                      &gt; {state.message}
                  </p>
              )}
              {state?.error && (
                  <p className="text-red-500 text-xs font-mono mt-2">
                      &gt; ERROR: {state.error}
                  </p>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-40 pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
           <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-300">
             ALCHIMISTRA // ORCHESTRATING THE DIGITAL ETHER
           </span>
           <span className="hidden md:inline font-mono text-zinc-600">|</span>
           <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
             AVAILABLE FOR MISSIONS
           </span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400">LOC: KUALA LUMPUR, MY</span>
          <span className="hidden md:inline font-mono text-zinc-600">|</span>
          <div className="flex items-center gap-6">
            <a href="https://github.com/irfanng" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.3em] text-zinc-300 hover:text-cyan-400 transition-colors">GITHUB</a>
            <a href="https://www.linkedin.com/in/irfan-ariff-20691a264" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.3em] text-zinc-300 hover:text-cyan-400 transition-colors">LINKEDIN</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending}
      type="submit"
      className="w-full mt-4 py-4 md:py-5 bg-cyan-500 text-black font-sans font-black uppercase text-[10px] md:text-sm tracking-[0.1em] md:tracking-[0.3em] flex items-center justify-center gap-2 md:gap-4 hover:bg-white hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
    >
      {pending ? (
        <>
          TRANSMITTING...
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
          />
        </>
      ) : (
        <>
          INITIATE_TRANSMUTATION
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}

