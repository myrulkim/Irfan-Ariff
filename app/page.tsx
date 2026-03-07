import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/components/experience";
import { CommandPalette } from "@/components/command-palette";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectsSection } from "@/components/projects-section";
import {
  Code2,
  Cpu
} from "lucide-react";
import Image from "next/image";
import { ContactSection } from "@/components/contact-section";
import { FreelanceServices } from "@/components/freelance-services";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { getProjects, getExperience, getTechStack, getProfile, getServices, getSiteConfig } from "@/lib/supabase/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  const techStack = await getTechStack();
  const profile = await getProfile();
  const services = await getServices();
  const config = await getSiteConfig();

  // Filter projects for commercial showcase
  const commercialProjects = projects.filter(p => p.is_commercial);

  return (
    <div className="flex flex-col gap-20 w-full relative">
      <VisitTracker />
      <Hero />

      <FreelanceServices
        profile={profile}
        services={services}
        commercialProjects={commercialProjects}
        config={config}
      />

      {/* Projects Section - Bento Grid */}
      <ProjectsSection projects={projects} />

      {/* Tech Stack - Categorized */}
      <section id="skills" className="col-span-3 space-y-8">
        <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-500" />
          <span className="text-blue-500">~/tech_stack</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend */}
          <div className="space-y-4 p-6 rounded-2xl border border-white/5 bg-neutral-900/20 backdrop-blur-sm">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500/70 opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Frontend_Systems
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.filter(t => t.category === 'frontend').map((tech) => (
                <Badge key={tech.id} variant="secondary" className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-100/80 border border-cyan-500/20 transition-all">
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Backend & Tools */}
          <div className="space-y-4 p-6 rounded-2xl border border-white/5 bg-neutral-900/20 backdrop-blur-sm">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-500/70 opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Backend_Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.filter(t => t.category === 'backend' || t.category === 'tools').map((tech) => (
                <Badge key={tech.id} variant="secondary" className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-100/80 border border-purple-500/20 transition-all">
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-4 p-6 rounded-2xl border border-white/5 bg-neutral-900/20 backdrop-blur-sm">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-500/70 opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mobile_Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.filter(t => t.category === 'mobile').map((tech) => (
                <Badge key={tech.id} variant="secondary" className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-100/80 border border-emerald-500/20 transition-all">
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience - Full Width */}
      <section className="col-span-3 space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500">~/experience</span>
        </h2>
        <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-md">
          <Experience experiences={experience} />
        </div>
      </section>

      <ContactSection profile={profile} config={config} />

      <div className="h-20" /> {/* Spacer for scrolling */}
      <CommandPalette />
    </div>
  );
}
