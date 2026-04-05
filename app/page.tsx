import { AlchemistHero } from "@/src/ui/sections/AlchemistHero";
import { AlchemistServices } from "@/src/ui/sections/AlchemistServices";
import { AlchemistProjects } from "@/src/ui/sections/AlchemistProjects";
import { AlchemistExperience } from "@/src/ui/sections/AlchemistExperience";
import { AlchemistContact } from "@/src/ui/sections/AlchemistContact";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { createClient } from "@/lib/supabase/server";
import { 
  getProjects, 
  getExperience, 
  getProfile, 
  getServices, 
  getSiteConfig
} from "@/lib/supabase/queries";

import { CommandPalette } from "@/components/command-palette";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    projects,
    experience,
    profile,
    services,
    config
  ] = await Promise.all([
    getProjects(supabase),
    getExperience(supabase),
    getProfile(supabase),
    getServices(supabase),
    getSiteConfig(supabase)
  ]);

  return (
    <div className="flex flex-col w-full relative">
      <VisitTracker />
      
      {/* OPERATION ALCHEMIST: THE COMPLETE STRIKE */}
      <AlchemistHero />
      
      <AlchemistServices services={services} />

      <AlchemistProjects projects={projects} />

      <AlchemistExperience experiences={experience} />

      <AlchemistContact profile={profile} />

      <CommandPalette />
    </div>
  );
}
