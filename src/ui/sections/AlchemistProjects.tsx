"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectData } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface AlchemistProjectsProps {
  projects: ProjectData[];
}

export function AlchemistProjects({ projects }: AlchemistProjectsProps) {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="w-full py-40 px-6 md:px-12 lg:px-24 relative z-10">
      <div className="flex flex-col gap-32">
        <div className="space-y-4">
          <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase">Mutation_Registry</span>
          <h2 className="font-sans font-black text-6xl md:text-9xl uppercase tracking-tighter text-white leading-none">
            Successful <br />
            Mutations.
          </h2>
        </div>

        <div className="flex flex-col gap-60">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center"
            >
              {/* Project Image Monolith */}
              <div className="lg:col-span-7 w-full aspect-[16/10] relative overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-cyan-500/20 transition-colors duration-700">
                {project.image_primary && (
                  <Image 
                    src={project.image_primary} 
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              {/* Project Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-500 uppercase">
                    PROJECT_0{index + 1} // {project.category}
                  </span>
                  <h3 className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tighter text-white">
                    {project.title}
                  </h3>
                  <p className="font-sans text-lg text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tech_stack?.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 border border-white/10 font-mono text-[9px] text-zinc-400 uppercase tracking-widest bg-white/[0.02]">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.live_url && (
                  <a 
                    href={project.live_url}
                    target="_blank"
                    className="inline-flex items-center gap-4 py-4 px-8 bg-white text-black font-sans font-black uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all duration-300"
                  >
                    ACCESS_PROJECT
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
