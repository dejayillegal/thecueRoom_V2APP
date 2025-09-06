import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function createMobileClient() {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
}

export function getMobileClient() {
  if (!client) client = createMobileClient();
  return client;
}

export const supabase = getMobileClient();
export type { SupabaseClient } from '@supabase/supabase-js';

