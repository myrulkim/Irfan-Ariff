export interface ProjectData {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    description: string;
    category: 'web' | 'mobile' | 'system';
    tech_stack: string[];
    image_primary: string | null;
    image_secondary: string | null;
    is_latest: boolean;
    is_commercial: boolean;
    github_url: string | null;
    live_url: string | null;
    display_order: number;
}

export interface ExperienceData {
    id: string;
    title: string;
    organization: string | null;
    date_range: string;
    description: string | null;
    is_active: boolean;
    display_order: number;
}

export interface TechStackData {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'tools' | null;
    display_order: number;
}

export interface ServiceData {
    id: string;
    title: string;
    description: string | null;
    icon_name: string;
    display_order: number;
    created_at: string;
}

export interface SiteConfigData {
    id: string;
    key: string;
    value: string;
}

export interface ProfileData {
    id: number;
    email: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    whatsapp_number: string | null;
    availability_status: string | null;
}

export interface AnalyticsData {
    id: number;
    event_name: string;
    count: number;
    updated_at: string;
}
