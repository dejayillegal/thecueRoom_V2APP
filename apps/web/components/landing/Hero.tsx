'use client';

import Link from 'next/link';
import Bloom from './Bloom';

export default function Hero({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section className="relative mx-auto max-w-[1200px] px-6 py-24 text-center">
      <Bloom />
      <h1 className="heading-1">Welcome to thecueRoom</h1>
      <p className="text-muted mx-auto mt-4 max-w-2xl">
        an AI-powered studio and community for underground techno and house artists.
      </p>
      <p className="text-muted mx-auto mt-4 max-w-2xl">
        Create with smart tools, stay verified and scam-free, and tap into a curated feed of underground news, gigs, and culture.
      </p>
      <p className="mt-6 italic text-purple">
        Where music meets machine, and the underground stays pure.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={onJoinClick}
          className="flex h-11 items-center rounded bg-lime px-6 font-bold text-black transition-transform hover:scale-105 hover:brightness-110"
        >
          Join the Community
        </button>
        <Link
          href="#learn-more"
          className="flex h-11 items-center rounded border border-lime px-6 font-bold text-lime transition-transform hover:scale-105 hover:brightness-110"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
