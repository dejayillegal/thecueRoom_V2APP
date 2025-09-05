'use client';
import Link from 'next/link';
import Logo from '@/components/Logo';
import UserMenu from '@/components/auth/UserMenu';
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
  return (
    <>
      <header className="py-6">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
          <Logo className="h-6 w-6" />
          {session ? (
            <UserMenu />
          ) : (
            <Link
              href="/login"
              className="rounded bg-lime px-4 py-2 font-bold text-black"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </header>
      <main>
        <Hero />
        <FeatureGrid />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-2 md:gap-8">
          <FeedPreview />
          <HowItWorks />
        </div>
        <CtaBand />
      </main>
      <Footer />
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
