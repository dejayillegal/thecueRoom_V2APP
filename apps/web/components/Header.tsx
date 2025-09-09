'use client';

import { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-black/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-3">
            <BrandLogo className="w-8 h-8" />
            <span className="text-white text-lg font-medium">thecueRoom</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded bg-[#D1E231] px-4 py-2 text-sm font-semibold text-black hover:bg-[#C2D629] transition-colors"
          >
            Login / Sign Up
          </button>
        </div>
      </header>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
