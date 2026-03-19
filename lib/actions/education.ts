'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addEducation(formData: FormData) {
    const supabase = await createClient();
    const institution = formData.get('institution') as string;
    const degree = formData.get('degree') as string;
    const duration = formData.get('duration') as string;
    const detailsRaw = formData.get('details') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_current = formData.get('is_current') === 'on';

    const details = detailsRaw ? detailsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const { error } = await supabase.from('education').insert([{
        institution, degree, duration, details, display_order, is_current
    }]);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/education');
    return { success: true };
}

export async function updateEducation(id: string, formData: FormData) {
    const supabase = await createClient();
    const institution = formData.get('institution') as string;
    const degree = formData.get('degree') as string;
    const duration = formData.get('duration') as string;
    const detailsRaw = formData.get('details') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_current = formData.get('is_current') === 'on';

    const details = detailsRaw ? detailsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const { error } = await supabase.from('education').update({
        institution, degree, duration, details, display_order, is_current
    }).eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/education');
    return { success: true };
}

export async function deleteEducation(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('education').delete().eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/education');
    return { success: true };
}
