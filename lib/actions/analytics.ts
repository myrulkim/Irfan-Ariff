'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function trackClick(eventName: string) {
    const supabase = await createClient();

    // Using rpc for atomic increment if available, 
    // otherwise fallback to a standard upsert/update logic.
    // Assuming the user will create a simple 'analytics' table.

    try {
        // Try to get existing count
        const { data, error: fetchError } = await supabase
            .from('analytics')
            .select('count')
            .eq('event_name', eventName)
            .maybeSingle();

        if (fetchError) throw fetchError;

        if (data) {
            // Update existing
            const { error: updateError } = await supabase
                .from('analytics')
                .update({ count: (data.count || 0) + 1, updated_at: new Date().toISOString() })
                .eq('event_name', eventName);

            if (updateError) throw updateError;
        } else {
            // Insert new
            const { error: insertError } = await supabase
                .from('analytics')
                .insert({ event_name: eventName, count: 1 });

            if (insertError) throw insertError;
        }

        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error(`Error tracking click for ${eventName}:`, error);
        return { success: false, error };
    }
}
