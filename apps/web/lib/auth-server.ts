'use server';
import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function signInWithOtp(email: string) {
  const supabase = serverClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/callback` },
  });
  if (error) throw error;
}

export async function signOut() {
  const supabase = serverClient();
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const supabase = serverClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
