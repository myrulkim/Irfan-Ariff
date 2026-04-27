"use client";

import { motion } from "framer-motion";

export function AlchemistProcess() {
  const reasons = [
    {
      title: "Reliable Technology",
      description: "We use the latest and most trusted tools to build your software. This means your product will be secure, fast, and easy to maintain for years to come."
    },
    {
      title: "Expert In-House Team",
      description: "Our team of developers and designers works together under one roof. We don't outsource, so you get better communication and higher quality results."
    },
    {
      title: "Fast & On-Time Delivery",
      description: "We value your time. Our team follows a proven process to make sure your project is completed on schedule without cutting corners on quality."
    },
    {
      title: "High Performance",
      description: "We make sure your apps and websites run smoothly. Every project goes through careful testing to ensure it works perfectly on all devices."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">Why choosing Copper Boston Group?</h2>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">Why Us?</span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-6 p-10 bg-zinc-50 border border-zinc-200 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group"
            >
              <h3 className="font-sans text-xl font-black text-primary uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                {reason.title}
              </h3>
              <p className="font-sans text-sm text-zinc-500 font-light leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}