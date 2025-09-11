import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  if (!url) {
    throw new Error('supabaseUrl is required.');
  }
  
  if (!anon) {
    throw new Error('supabaseAnonKey is required.');
  }

  try {
    client = createClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true, // <- handles magic-link hash if a client component runs on the page
      },
    });
    return client;
  } catch (error) {
    console.warn('Failed to create Supabase client:', error);
    // For development/demo purposes, create a minimal mock client
    const mockClient = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock client - authentication disabled' } }),
        signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock client - authentication disabled' } }),
        signOut: () => Promise.resolve({ error: null }),
      }
    } as SupabaseClient;
    client = mockClient;
    return mockClient;
  }
}