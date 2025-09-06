'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

interface SessionContextValue {
  supabase: SupabaseClient;
  session: Session | null;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const client = getBrowserClient();
    setSupabase(client);
    client.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!supabase) return null;

  return (
    <SessionContext.Provider value={{ supabase, session }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
