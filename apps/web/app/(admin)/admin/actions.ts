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
  return { supabase: serverClient(), session };
}

async function audit(supabase: ReturnType<typeof serverClient>, reportId: string, action: string, actorId: string) {
  await supabase.from('moderation_audit').insert({ report_id: reportId, action, actor_id: actorId });
}

export async function approveReport(id: string) {
  const { supabase, session } = await requireAdmin();
  await supabase.from('reports').update({ status: 'approved' }).eq('id', id);
  await audit(supabase, id, 'approved', session.user.id);
}

export async function rejectReport(id: string) {
  const { supabase, session } = await requireAdmin();
  await supabase.from('reports').update({ status: 'rejected' }).eq('id', id);
  await audit(supabase, id, 'rejected', session.user.id);
}
