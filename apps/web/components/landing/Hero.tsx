'use client';

import Link from 'next/link';
import Bloom from './Bloom';

export default function Hero({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section className="relative mx-auto max-w-[1200px] px-6 py-24 text-center">
      <Bloom />
      <h1 className="heading-1">Book gigs. Look legit. Create faster.</h1>
      <p className="text-muted mx-auto mt-4 max-w-2xl">
        An invite-only studio and community for underground techno & house artists. Generate release-ready art, get verified to avoid scams, and tap a vetted feed of gigs, news, and collaborators.
      </p>
      <p className="mt-2 italic text-purple">
        Where music meets machine, and the underground stays pure.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={onJoinClick}
          className="flex h-11 items-center rounded bg-lime px-6 font-bold text-black transition-transform hover:scale-105 hover:brightness-110"
        >
          Join Free — Get Magic Link
        </button>
        <Link
          href="#how-it-works"
          className="flex h-11 items-center rounded border border-lime px-6 font-bold text-lime transition-transform hover:scale-105 hover:brightness-110"
        >
          See How It Works
        </Link>
      </div>
      <div className="mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing.svg"
          alt="TheCueRoom landing illustration"
          width={400}
          height={300}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
