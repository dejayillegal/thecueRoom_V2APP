'use client';

import { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BrandLogo />
            <span className="text-white/90 font-medium">thecueRoom</span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="rounded bg-[#D1FF3D] px-3 py-1.5 text-sm font-semibold text-black hover:brightness-95"
          >
            Login / Sign Up
          </button>
        </div>
      </header>
      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
}

