import { MetadataRoute } from "next";
import { getProjects } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.irfanariff.com";

    // Get all projects from Supabase
    const projects = await getProjects();

    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/#${project.slug}`,
        lastModified: new Date(project.created_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...projectEntries,
    ];
}
