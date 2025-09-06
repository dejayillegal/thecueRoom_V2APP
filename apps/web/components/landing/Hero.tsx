'use client';

import Link from 'next/link';
import Bloom from './Bloom';

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-[1200px] px-6 py-24 text-center">
      <Bloom />
      <h1 className="heading-1">Welcome to thecueRoom</h1>
      <p className="text-muted mx-auto mt-4 max-w-2xl">
        Discover the next wave of underground music powered by community and tech.
      </p>
      <p className="mt-2 italic text-purple">
        Where music meets machine, and the underground stays pure.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/signup"
          className="flex h-11 items-center rounded bg-lime px-6 font-bold text-black"
        >
          Join the Community
        </Link>
        <Link
          href="#learn-more"
          className="flex h-11 items-center rounded border border-lime px-6 font-bold text-lime"
        >
          Learn More
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
