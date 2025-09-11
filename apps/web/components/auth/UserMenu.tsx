'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getBrowserClient } from '@/lib/supabase-browser';
import { useSession } from '@/app/providers';

export default function UserMenu() {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSupabase(getBrowserClient());
  }, []);

  if (!session) return null;
  const avatar = session.user.user_metadata?.avatar_url as string | undefined;
  const role = session.user.app_metadata?.role as string | undefined;

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    location.href = '/login';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-8 w-8 overflow-hidden rounded-full border border-lime"
      >
        {avatar ? (
          <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
        ) : (
          <span className="block h-full w-full bg-lime" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded bg-black p-2 text-white">
          <Link href="/profile" className="block px-2 py-1 hover:bg-lime hover:text-black">
            Profile
          </Link>
          {role === 'admin' && (
            <Link href="/admin" className="block px-2 py-1 hover:bg-lime hover:text-black">
              Admin
            </Link>
          )}
          <button
            type="button"
            onClick={signOut}
            className="block w-full px-2 py-1 text-left hover:bg-lime hover:text-black"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
