"use client";

import { ProfileData } from "@/lib/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/lib/actions/send-email";
import { motion } from "framer-motion";

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
    <>
      <section id="contact" className="py-24 px-6 md:px-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[1440px] mx-auto"
        >
          <div className="mb-24 text-left">
            <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">Contact</h2>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">Contact Us</span>
              <div className="w-12 h-[1px] bg-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <p className="font-sans text-base text-zinc-500 font-light leading-relaxed mb-12">
                Ready to take your business to the next level? Contact us now to discuss your project requirements and discover how Copper Boston Group can help you achieve your goals. Let&apos;s collaborate to turn your ideas into success stories! Enquire now!
              </p>
              
              <div className="bg-zinc-50 p-10 border border-zinc-100 shadow-2xl shadow-zinc-100/50">
                <form action={formAction} className="space-y-10">
                  <div className="relative group">
                    <input 
                      name="name" 
                      required 
                      type="text" 
                      placeholder=" " 
                      className="peer w-full bg-transparent border-0 border-b border-zinc-200 px-0 py-3 text-zinc-900 font-sans text-sm focus:ring-0 focus:border-primary transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-zinc-400 font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                      Your Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      name="email" 
                      required 
                      type="email" 
                      placeholder=" " 
                      className="peer w-full bg-transparent border-0 border-b border-zinc-200 px-0 py-3 text-zinc-900 font-sans text-sm focus:ring-0 focus:border-primary transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-zinc-400 font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                      Your Email
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      name="message" 
                      required 
                      rows={4} 
                      placeholder=" " 
                      className="peer w-full bg-transparent border-0 border-b border-zinc-200 px-0 py-3 text-zinc-900 font-sans text-sm focus:ring-0 focus:border-primary transition-colors resize-none"
                    />
                    <label className="absolute left-0 top-3 text-zinc-400 font-sans text-[11px] tracking-[0.1em] uppercase transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">
                      Message
                    </label>
                  </div>

                  <div className="pt-2">
                    <SubmitButton />
                  </div>

                  {state?.success && <p className="text-primary text-[10px] font-sans mt-4 uppercase font-bold">Message Sent Successfully.</p>}
                </form>
              </div>
            </div>

            <div className="space-y-16">
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'wght' 300" }}>location_on</span>
                </div>
                <div>
                  <h3 className="font-sans text-2xl font-black text-zinc-900 mb-3 tracking-tighter uppercase">Our Address</h3>
                  <p className="font-sans text-base text-zinc-500 font-light leading-relaxed">
                    Unit 9-22 & 9-23, Level 9, Tower 1,<br/>
                    Wangsa 118, No. 8, Jalan Wangsa Delima,<br/>
                    Wangsa Maju, 53300 Kuala Lumpur.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'wght' 300" }}>mail</span>
                </div>
                <div>
                  <h3 className="font-sans text-2xl font-black text-zinc-900 mb-3 tracking-tighter uppercase">Email Us</h3>
                  <p className="font-sans text-base text-zinc-500 font-light">
                    info@copperboston.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      <footer className="bg-zinc-50 flex flex-col md:flex-row justify-between items-center w-full px-12 py-10 border-t border-zinc-100 mt-auto">
        <div className="text-xl font-black text-zinc-900 mb-4 md:mb-0 tracking-tighter uppercase">
          CBG
        </div>

        <div className="font-sans text-[11px] tracking-[0.1em] uppercase font-bold text-zinc-400">
          © 2026 Copper Boston Group. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending}
      type="submit"
      className="bg-primary text-white font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-5 hover:bg-primary/90 transition-all flex items-center space-x-3 disabled:opacity-50"
    >
      <span>{pending ? "SENDING..." : "SUBMIT INQUIRY"}</span>
      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>arrow_forward</span>
    </button>
  );
}