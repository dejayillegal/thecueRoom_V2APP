'use client';

import AuthHashHandler from '@/components/auth/AuthHashHandler';
import Header from '@/components/Header';
import { Suspense } from 'react';

export default function Landing() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      {/* magic-link parser */}
      <Suspense>
        <AuthHashHandler />
      </Suspense>

      {/* Header */}
      <Header />

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
