import * as SecureStore from 'expo-secure-store';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

const KEY = 'sb-session';

export async function loadSession() {
  const raw = await SecureStore.getItemAsync(KEY);
  if (raw) {
    const session: Session = JSON.parse(raw);
    await supabase.auth.setSession(session);
    return session;
  }
  return null;
}

export async function saveSession(session: Session | null) {
  if (session) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(session));
  } else {
    await SecureStore.deleteItemAsync(KEY);
  }
}

export function initSessionListener() {
  supabase.auth.onAuthStateChange((_e, session) => {
    saveSession(session);
  });
}
