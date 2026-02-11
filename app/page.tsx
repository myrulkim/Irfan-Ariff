import { Hero } from "@/components/hero";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/components/experience";
import { CommandPalette } from "@/components/command-palette";
import { MobileShowcase } from "@/components/mobile-showcase";
import { BrowserMockup } from "@/components/browser-mockup";
import { ProjectHeader } from "@/components/project-header";
import {
  Terminal,
  Smartphone,
  Database,
  Globe,
  Code2,
  Layers,
  Cpu
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 w-full relative">
      <Hero />

      {/* Projects Section - Bento Grid */}
      <section id="projects" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-500" />
          <span className="text-green-500">~/projects</span>
          <span className="text-gray-600">ls -la</span>
        </h2>

        <BentoGrid className="md:auto-rows-[22rem]">
          {/* JomSujud - Large Feature Card (2x2) */}
          <BentoGridItem
            className="md:col-span-2 md:row-span-2 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<MobileShowcase primaryColor="bg-emerald-500" />}
            title={<ProjectHeader title="JomSujud" extension=".dart" />}
            description={
              <div className="space-y-4 pt-2">
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Iconic Mosque Locator & Prayer Times App.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/30">Flutter</Badge>
                  <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 hover:bg-blue-900/30">Places API</Badge>
                </div>
              </div>
            }
            icon={<Smartphone className="h-4 w-4 text-emerald-500" />}
          />

          {/* BenAwangHub - Mobile App */}
          <BentoGridItem
            className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<MobileShowcase primaryColor="bg-blue-500" />}
            title={<ProjectHeader title="BenAwangHub" extension=".tsx" />}
            description={<span className="text-neutral-400 text-sm">Community Hub/Family Event Management.</span>}
            icon={<Globe className="h-4 w-4 text-neutral-500" />}
          >
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-[10px] border-blue-900/50 text-blue-500">Flutter</Badge>
              <Badge variant="outline" className="text-[10px] border-green-900/50 text-green-500">Firebase</Badge>
            </div>
          </BentoGridItem>

          {/* CutiMate - Mobile App */}
          <BentoGridItem
            className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<MobileShowcase primaryColor="bg-orange-500" />}
            title={<ProjectHeader title="CutiMate" extension=".dart" />}
            description={<span className="text-neutral-400 text-sm">Holiday Planner With Group Voting.</span>}
            icon={<Globe className="h-4 w-4 text-orange-500" />}
          >
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-[10px] border-blue-900/50 text-blue-500">Flutter</Badge>
              <Badge variant="outline" className="text-[10px] border-yellow-900/50 text-yellow-500">Firebase</Badge>
              <Badge variant="outline" className="text-[10px] border-green-900/50 text-green-500">Places API</Badge>
            </div>
          </BentoGridItem>

          {/* BinaPintar - Web App */}
          <BentoGridItem
            className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<BrowserMockup appName="BinaPintar" url="cms.binapintar.com" imageSrc="/BinaPintar.png" />}
            title={<ProjectHeader title="BinaPintar" extension=".sql" />}
            description={<span className="text-neutral-400 text-sm">Smart Construction CMS.</span>}
            icon={<Database className="h-4 w-4 text-orange-500" />}
          >
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-[10px] border-orange-900/50 text-orange-500">Supabase</Badge>
              <Badge variant="outline" className="text-[10px] border-yellow-900/50 text-yellow-500">CMS</Badge>
            </div>
          </BentoGridItem>

          {/* Qalam Irma - Web App */}
          <BentoGridItem
            className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<BrowserMockup appName="Qalam Irma" url="qalamirma.com" imageSrc="/Qalam Irma.png" />}
            title={<ProjectHeader title="Qalam Irma" extension=".tsx" />}
            description={<span className="text-neutral-400 text-sm">Business landing page.</span>}
            icon={<Layers className="h-4 w-4 text-indigo-500" />}
          >
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-[10px] border-indigo-900/50 text-indigo-500">Next.js</Badge>
              <Badge variant="outline" className="text-[10px] border-pink-900/50 text-pink-500">SEO</Badge>
            </div>
          </BentoGridItem>

          {/* HabibahKamal - Web App */}
          <BentoGridItem
            className="md:col-span-1 border-white/10 bg-neutral-900/50 backdrop-blur-md"
            header={<BrowserMockup appName="HabibahKamal" url="habibahkamal.com" imageSrc="/HabibahKamal.png" />}
            title={<ProjectHeader title="HabibahKamal" extension=".tsx" />}
            description={<span className="text-neutral-400 text-sm">Personal Brand Landing Page.</span>}
            icon={<Globe className="h-4 w-4 text-pink-500" />}
          >
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-[10px] border-pink-900/50 text-pink-500">Next.js</Badge>
              <Badge variant="outline" className="text-[10px] border-purple-900/50 text-purple-500">Framer Motion</Badge>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </section>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Tech Stack */}
        <section className="col-span-1 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">~/tech_stack</span>
          </h2>
          <div className="flex flex-wrap gap-2 p-6 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm">
            {[
              "Next.js (App Router)",
              "Tailwind CSS",
              "shadcn/ui",
              "Framer Motion",
              "PWA",
              "Flutter",
              "Dart",
              "Supabase",

              "Firebase (Firestore, Auth)",
              "SQL Scripts"
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500">~/experience</span>
          </h2>
          <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm">
            <Experience />
          </div>
        </section>
      </div>

      <div className="h-20" /> {/* Spacer for scrolling */}
      <CommandPalette />
    </div>
  );
}
