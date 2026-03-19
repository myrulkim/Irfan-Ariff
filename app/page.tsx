import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/components/experience";
import { CommandPalette } from "@/components/command-palette";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectsSection } from "@/components/projects-section";
import {
  Code2
} from "lucide-react";
import Image from "next/image";
import { ContactSection } from "@/components/contact-section";
import { FreelanceServices } from "@/components/freelance-services";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { getProjects, getExperience, getTechStack, getProfile, getServices, getSiteConfig, getEducation, getCertificates } from "@/lib/supabase/queries";
import { EducationSection } from "@/components/education-section";
import { CertificatesSection } from "@/components/certificates-section";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  const profile = await getProfile();
  const services = await getServices();
  const config = await getSiteConfig();
  const education = await getEducation();
  const certificates = await getCertificates();

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

      {/* Experience - Full Width */}
      <section id="experience" className="col-span-3 space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500">~/experience</span>
        </h2>
        <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 backdrop-blur-md">
          <Experience experiences={experience} />
        </div>
      </section>

      {/* Education & Certificates */}
      <EducationSection education={education} />
      <CertificatesSection certificates={certificates} />

      <ContactSection profile={profile} config={config} />

      <div className="h-20" /> {/* Spacer for scrolling */}
      <CommandPalette />
    </div>
  );
}
