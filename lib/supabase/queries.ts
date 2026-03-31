import { createClient } from '@/lib/supabase/server';
import { ProjectData, ExperienceData, TechStackData, ProfileData, ServiceData, SiteConfigData, AnalyticsData, EducationData, CertificateData } from '@/lib/types';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getAnalytics(supabase?: SupabaseClient): Promise<AnalyticsData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('analytics')
        .select('*')
        .order('count', { ascending: false });

    if (error) {
        console.error('Error fetching analytics:', error);
        return [];
    }

    return data as AnalyticsData[];
}

export async function getProjects(supabase?: SupabaseClient): Promise<ProjectData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('projects')
        .select('*')
        .order('is_latest', { ascending: false })
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data as ProjectData[];
}

export async function getExperience(supabase?: SupabaseClient): Promise<ExperienceData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching experience:', error);
        return [];
    }

    return data as ExperienceData[];
}

export async function getTechStack(supabase?: SupabaseClient): Promise<TechStackData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('tech_stack')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching tech stack:', error);
        return [];
    }

    return data as TechStackData[];
}

export async function getProfile(supabase?: SupabaseClient): Promise<ProfileData | null> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('profile')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data as ProfileData;
}

export async function getServices(supabase?: SupabaseClient): Promise<ServiceData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }

    return data as ServiceData[];
}

export async function getSiteConfig(supabase?: SupabaseClient): Promise<Record<string, string>> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('site_config')
        .select('key, value');

    if (error) {
        console.error('Error fetching site config:', error);
        return {};
    }

    const config: Record<string, string> = {};
    data.forEach(item => {
        config[item.key] = item.value;
    });

    return config;
}

export async function getEducation(supabase?: SupabaseClient): Promise<EducationData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('education')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching education:', error);
        return [];
    }

    return data as EducationData[];
}

export async function getCertificates(supabase?: SupabaseClient): Promise<CertificateData[]> {
    const client = supabase || await createClient();
    const { data, error } = await client
        .from('certificates')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }

    return data as CertificateData[];
}
