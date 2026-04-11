import { AlchemistHero } from "@/src/ui/sections/AlchemistHero";
import { AlchemistServices } from "@/src/ui/sections/AlchemistServices";
import { AlchemistProjects } from "@/src/ui/sections/AlchemistProjects";
import { AlchemistContact } from "@/src/ui/sections/AlchemistContact";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import { createClient } from "@/lib/supabase/server";
import { 
  getProjects, 
  getProfile, 
  getServices, 
  getSiteConfig
} from "@/lib/supabase/queries";

import { CommandPalette } from "@/components/command-palette";
import { AlchemistLayout } from "@/src/ui/layout/AlchemistLayout";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    projects,
    profile,
    services,
    config
  ] = await Promise.all([
    getProjects(supabase),
    getProfile(supabase),
    getServices(supabase),
    getSiteConfig(supabase)
  ]);

  return (
    <AlchemistLayout>
      <div className="block w-full max-w-[100vw] relative">
        <VisitTracker />
        
        {/* OPERATION ALCHEMIST: THE COMPLETE STRIKE */}
        <AlchemistHero />
        
        <AlchemistServices services={services} />

        <AlchemistProjects projects={projects} />

        <AlchemistContact profile={profile} />

        <CommandPalette />
      </div>
    </AlchemistLayout>
  );
}
