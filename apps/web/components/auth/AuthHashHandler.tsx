'use client';

import { useEffect } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';

export default function AuthHashHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) return;

    const params = new URLSearchParams(hash.slice(1));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    const type = params.get('type'); // signup, recovery, magiclink

    if (access_token && refresh_token) {
      const supabase = getBrowserClient();
      supabase.auth
        .setSession({ access_token, refresh_token })
        .finally(() => {
          // clean the hash so the URL looks nice
          window.history.replaceState({}, '', window.location.pathname);
        });
    } else {
      // even if setSession isn't called, remove noisy hash
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return null;
}
