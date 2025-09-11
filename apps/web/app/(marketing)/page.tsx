'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import UserMenu from '@/components/auth/UserMenu';
import LoginDialog from '@/components/auth/LoginDialog';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import FeatureGrid from '@/components/landing/FeatureGrid';
import FeedPreview from '@/components/landing/FeedPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import CtaBand from '@/components/landing/CtaBand';
import Footer from '@/components/landing/Footer';
import FooterGlow from '@/components/landing/FooterGlow';
import { SessionProvider, useSession } from '@/app/providers';
import './_styles.css';

export const dynamic = 'force-dynamic';

function LandingContent() {
  return (
    <main className="pt-20">
      <Hero />
      <FeatureGrid />
      <FeedPreview />
      <HowItWorks />
      <CtaBand />
      <Footer />
      <FooterGlow />
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <Header />
      <LandingContent />
      <LoginDialog />
    </SessionProvider>
  );
}