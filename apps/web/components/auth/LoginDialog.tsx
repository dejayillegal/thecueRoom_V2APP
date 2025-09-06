'use client';

import { useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';

export default function LoginDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const supabase = getBrowserClient();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setErr(error.message);
    else setSent(true);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur">
      <div className="w-full max-w-md rounded-2xl bg-[#111111] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Login / Sign Up</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>
        {sent ? (
          <p className="mt-4 text-zinc-300">
            Magic link sent! Check your inbox on this device. Keep this tab open.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <label className="block text-sm text-zinc-300">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-[var(--lime)]"
              />
            </label>
            {err && <p className="text-sm text-red-400">{err}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--lime)] px-4 py-2 font-medium text-black hover:opacity-90"
            >
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
