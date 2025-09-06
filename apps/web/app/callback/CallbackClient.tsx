'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase-browser';

export default function CallbackClient() {
  const router = useRouter();
  const [msg, setMsg] = useState('Finalizing sign-in…');

  useEffect(() => {
    const supabase = getBrowserClient();
    const url = new URL(window.location.href);

    // Support both OAuth PKCE and magic-link flows:
    //  - OAuth: `code` in search params
    //  - Magic link: access_token in hash (older flows)
    const code = url.searchParams.get('code');
    const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
    const access_token = hash.get('access_token');
    const refresh_token = hash.get('refresh_token');

    (async () => {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (access_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token ?? '',
          });
          if (error) throw error;
        }
        setMsg('Signed in. Redirecting…');
        // honor `redirect_to` if provided; fallback to feed/home
        const redirect = url.searchParams.get('redirect_to') || '/feed';
        router.replace(redirect);
      } catch (e: any) {
        console.error('Auth callback error', e);
        setMsg('Sign-in failed. You can close this tab and try again.');
      }
    })();
  }, [router]);

  return (
    <main className="min-h-screen grid place-items-center bg-[var(--bg)] text-white">
      <div className="rounded-xl bg-[color:rgba(17,17,17,0.6)] p-6 backdrop-blur">
        <p>{msg}</p>
      </div>
    </main>
  );
}

