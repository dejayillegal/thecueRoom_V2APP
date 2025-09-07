'use client';

import AuthHashHandler from '@/components/auth/AuthHashHandler';
import Header from '@/components/Header';
import { Suspense } from 'react';
import { withBase } from '@/lib/basePath';

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      {/* magic-link parser */}
      <Suspense>
        <AuthHashHandler />
      </Suspense>

      {/* Header */}
      <Header />

      {/* The illustration — path now safe on GH Pages */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-16">
        <img
          src={withBase('/landing.svg')}
          alt="TheCueRoom marketing landing"
          style={{ width: '100%', height: 'auto' }}
          loading="eager"
        />
      </section>
    </main>
  );
}
