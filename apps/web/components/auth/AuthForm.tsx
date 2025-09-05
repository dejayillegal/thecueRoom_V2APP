"use client";
import { useState } from 'react';
import { getBrowserClient } from '../../lib/supabase-browser';

export default function AuthForm() {
  const supabase = getBrowserClient();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendLink = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/callback` } });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for a magic link.');
    }
  };

  const oauth = async (provider: 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${location.origin}/callback` } });
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border border-lime bg-transparent p-2 text-white"
      />
      <button
        type="button"
        onClick={sendLink}
        className="w-full rounded bg-lime p-2 font-bold text-black"
      >
        Send Magic Link
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => oauth('google')}
          className="flex-1 rounded border border-lime p-2 text-lime"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => oauth('apple')}
          className="flex-1 rounded border border-lime p-2 text-lime"
        >
          Apple
        </button>
      </div>
      {message && <p className="text-sm text-lime">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
