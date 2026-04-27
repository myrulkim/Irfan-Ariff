"use client";

import { motion } from "framer-motion";
import { Globe, Github, Linkedin } from "lucide-react";

export function AlchemistAbout() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 uppercase">About</h2>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] tracking-[0.4em] text-primary uppercase font-bold">About Us</span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/3] bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden group shadow-2xl shadow-zinc-200/50">
             <img 
               src="/about-image-new.jpeg" 
               alt="About Us" 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="space-y-10">
            <h3 className="font-sans text-3xl font-black text-zinc-900 leading-tight tracking-tighter">
              Helping Your Business Succeed in the Digital World.
            </h3>
            <p className="font-sans text-base text-zinc-500 font-light leading-relaxed">
              At Copper Boston Group (CBG), we focus on making high-quality software and websites that help your business run better. We know that every business is different, so we build custom solutions that fit your exact needs. Our goal is to make technology simple and useful for you.
            </p>
            
            <div className="flex flex-col gap-8 pt-6">
              <div className="flex gap-6 items-start">
                <div className="w-3 h-3 mt-1.5 rounded-full bg-primary shrink-0" />
                <div>
                  <h4 className="font-sans font-black text-zinc-900 uppercase tracking-tighter text-lg mb-2">Built for Your Growth</h4>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">We create software that scales with your business, from small startups to growing companies.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-3 h-3 mt-1.5 rounded-full bg-primary shrink-0" />
                <div>
                  <h4 className="font-sans font-black text-zinc-900 uppercase tracking-tighter text-lg mb-2">Simple & Effective</h4>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light">We focus on clean designs and smooth functionality to make sure your users have a great experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEAM SECTION STRIKE */}
        <div className="mt-48">
          <div className="mb-20">
            <h3 className="font-sans text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-4">Our Team</h3>
            <div className="w-12 h-1 bg-zinc-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                id: "irfan",
                name: "Muhammad Nur Irfan Bin Mohd Ariff",
                role: "Founder + CTO",
                image: "/irfan.jpeg",
                links: { 
                  portfolio: "https://irfanariff.com", 
                  github: "https://github.com/IrfanNG", 
                  linkedin: "https://www.linkedin.com/in/irfan-ariff-20691a264" 
                }
              },
              {
                id: "haziq",
                name: "Muhammad Haziq Bin Rosli",
                role: "Founder + COO",
                image: "/haziq.jpeg",
                links: { 
                  portfolio: "https://portfolio-haziq.vercel.app/", 
                  github: "https://github.com/haziqrosli0408", 
                  linkedin: "https://www.linkedin.com/in/haziq-rosli-3292673a4" 
                }
              },
              {
                id: "amirul",
                name: "Muhammad Amirul Hakim Bin Mat Zuki",
                role: "Founder + QA Lead",
                image: "/amirul.jpeg",
                links: { 
                  portfolio: "#", 
                  github: "https://github.com/myrulkim", 
                  linkedin: "https://www.linkedin.com/in/amirulhakim1710/" 
                }
              },
              {
                id: "yat",
                name: "Muhammad Iyad Iman Bin Mohmad Nazri",
                role: "Founder + Business Lead",
                image: "/yat.jpeg",
                links: { 
                  portfolio: "#", 
                  github: "https://github.com/pakyad", 
                  linkedin: "https://www.linkedin.com/in/iyad-iman-155a37237?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                }
              }
            ].map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-zinc-100 border border-zinc-200 overflow-hidden mb-6 transition-all duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-sans font-black text-zinc-900 text-sm uppercase tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="font-sans text-[11px] text-primary font-black uppercase tracking-[0.2em]">
                      {member.role}
                    </p>
                    <p className="font-sans text-[9px] text-zinc-400 uppercase tracking-wider font-medium leading-relaxed">
                      Bachelor of Information Technology in Software Engineering
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-zinc-100">
                    <a href={member.links.portfolio} className="text-zinc-400 hover:text-primary transition-colors duration-300">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                    <a href={member.links.github} className="text-zinc-400 hover:text-zinc-900 transition-colors duration-300">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a href={member.links.linkedin} className="text-zinc-400 hover:text-blue-600 transition-colors duration-300">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}