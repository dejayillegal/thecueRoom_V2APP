'use client';

import AuthHashHandler from '@/components/auth/AuthHashHandler';
import BrandLogo from '@/components/BrandLogo';
import LoginDialog from '@/components/auth/LoginDialog';
import { Suspense, useState } from 'react';

export default function Landing() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      {/* magic-link parser */}
      <Suspense>
        <AuthHashHandler />
      </Suspense>

      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-6 w-6" />
          <span className="text-sm text-zinc-300">thecueRoom</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-[var(--lime,#D1FF3D)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Login / Sign Up
        </button>
        <LoginDialog open={open} onClose={() => setOpen(false)} />
      </header>

      {/* EXACT marketing artwork as-is */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-16">
        <img
          src={`${prefix}/marketing/MarketingLanding.png`}
          alt="TheCueRoom marketing landing"
          className="block h-auto w-full select-none"
          draggable={false}
        />
      </section>
    </main>
  );
}
