'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import UserMenu from '@/components/auth/UserMenu';
import LoginDialog from '@/components/auth/LoginDialog';
import Hero from '@/components/landing/Hero';
import FeatureGrid from '@/components/landing/FeatureGrid';
import FeedPreview from '@/components/landing/FeedPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import CtaBand from '@/components/landing/CtaBand';
import Footer from '@/components/landing/Footer';
import { SessionProvider, useSession } from '@/app/providers';
import './_styles.css';

export const dynamic = 'force-dynamic';

function Content() {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="py-6">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
          <Logo className="h-6 w-6" />
          {session ? (
            <UserMenu />
          ) : (
            <div className="relative group">
              <button
                onClick={() => setOpen(true)}
                className="rounded bg-lime px-4 py-2 font-bold text-black transition-transform hover:scale-105 hover:brightness-110"
              >
                Join Free
              </button>
              <div className="absolute right-0 mt-2 hidden w-56 rounded bg-surface p-2 text-xs text-muted shadow group-hover:block">
                <p>Email magic link — no password</p>
                <p className="mt-1 flex items-center gap-1 text-[10px]">
                  <span aria-hidden>🔒</span>Invite-only • Verified community
                </p>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <Hero onJoinClick={() => setOpen(true)} />
        <FeatureGrid />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-2 md:gap-8">
          <FeedPreview />
          <HowItWorks />
        </div>
        <CtaBand onJoinClick={() => setOpen(true)} />
      </main>
      <Footer />
      {!session && showSticky && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-lime px-4 py-2 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 hover:brightness-110 md:hidden"
        >
          Join Free
        </button>
      )}
      <LoginDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
}
