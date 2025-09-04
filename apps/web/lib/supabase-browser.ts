import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase env vars missing');
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export function getBrowserClient() {
  if (!client) {
    client = createBrowserClient();
  }
  return client;
}

export type { SupabaseClient } from '@supabase/supabase-js';
