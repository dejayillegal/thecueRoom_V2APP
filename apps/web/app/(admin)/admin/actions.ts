'use server';

import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/auth-server';

function serverClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

async function requireAdmin() {
  const session = await getSession();
  if (session?.user.user_metadata.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return serverClient();
}

export async function approveReport(id: string) {
  const supabase = await requireAdmin();
  await supabase.from('reports').update({ status: 'approved' }).eq('id', id);
}

export async function rejectReport(id: string) {
  const supabase = await requireAdmin();
  await supabase.from('reports').update({ status: 'rejected' }).eq('id', id);
}
