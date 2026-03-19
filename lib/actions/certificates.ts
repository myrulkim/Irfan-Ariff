'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCertificate(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const issuer = formData.get('issuer') as string;
    const issue_date = formData.get('issue_date') as string;
    const credential_url = formData.get('credential_url') as string;
    const icon_tag = formData.get('icon_tag') as string || 'award';
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('certificates').insert([{
        title, issuer, issue_date, credential_url, icon_tag, display_order
    }]);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/certificates');
    return { success: true };
}

export async function updateCertificate(id: string, formData: FormData) {
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const issuer = formData.get('issuer') as string;
    const issue_date = formData.get('issue_date') as string;
    const credential_url = formData.get('credential_url') as string;
    const icon_tag = formData.get('icon_tag') as string || 'award';
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('certificates').update({
        title, issuer, issue_date, credential_url, icon_tag, display_order
    }).eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/certificates');
    return { success: true };
}

export async function deleteCertificate(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('certificates').delete().eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/certificates');
    return { success: true };
}
