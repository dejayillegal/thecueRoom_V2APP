"use client";
import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getBrowserClient } from '@/lib/supabase-browser';

export default function TOTPSetup() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSupabase(getBrowserClient());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
      if (!error && data?.totp) {
        setQr(data.totp.qr_code);
        setFactorId(data.id);
      }
    })();
  }, [supabase]);

  const verify = async () => {
    if (!supabase || !factorId) return;
    const { error } = await supabase.auth.mfa.verify({ factorId, code } as any);
    if (error) {
      setError(error.message);
    } else {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        await supabase.from('profiles').update({ mfa_enrolled: true }).eq('id', user.id);
      }
      setDone(true);
    }
  };

  if (done) return <p className="text-lime">TOTP enabled</p>;

  return (
    <div className="space-y-4">
      {qr && (
        <img src={`data:image/png;base64,${qr}`} alt="TOTP QR" className="mx-auto" />
      )}
      <p className="text-sm text-white">Store your recovery codes safely.</p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        className="w-full rounded border border-lime bg-transparent p-2 text-white"
      />
      <button
        type="button"
        onClick={verify}
        className="w-full rounded bg-lime p-2 font-bold text-black"
      >
        Verify
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
