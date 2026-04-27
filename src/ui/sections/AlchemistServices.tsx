"use client";

import { ServiceData } from "@/lib/types";
import { motion } from "framer-motion";

interface AlchemistServicesProps {
  services: ServiceData[];
}

export function AlchemistServices({ services }: AlchemistServicesProps) {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-zinc-50 border-y border-zinc-200">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">Services</h2>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">Check our Services</span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 p-12 bg-white border border-zinc-200 hover:border-primary/20 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group">
            <h3 className="font-sans text-3xl font-black text-primary uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
              Software Development
            </h3>
            <p className="font-sans text-base text-zinc-500 font-light leading-relaxed">
              We build custom software that helps you automate tasks and work more efficiently. From mobile apps to business management tools, we create solutions that solve your specific problems and help you grow.
            </p>
            <div className="pt-6">
               <button className="text-primary font-black text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-primary/80 transition-colors">Tell Us Your Idea</button>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-12 bg-white border border-zinc-200 hover:border-primary/20 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group">
            <h3 className="font-sans text-3xl font-black text-primary uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
              Website Design
            </h3>
            <p className="font-sans text-base text-zinc-500 font-light leading-relaxed">
              Your website is your digital storefront. We design and build fast, modern websites that look great on any device and help you turn visitors into loyal customers.
            </p>
            <div className="pt-6">
               <button className="text-primary font-black text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-primary/80 transition-colors">Start Your Website</button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}