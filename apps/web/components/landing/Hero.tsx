'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Bloom from './Bloom';

export default function Hero() {
  const [showImage, setShowImage] = useState(true);

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
          className="rounded bg-lime px-6 py-3 font-bold text-black"
        >
          Join the Community
        </Link>
        <Link
          href="#learn-more"
          className="rounded border border-lime px-6 py-3 font-bold text-lime"
        >
          Learn More
        </Link>
      </div>
      {showImage && (
        <div className="mt-16">
          <Image
            src="/landing.svg"
            alt="TheCueRoom landing illustration"
            width={400}
            height={300}
            className="h-auto w-full"
            onError={() => setShowImage(false)}
            priority
          />
        </div>
      )}
    </section>
  );
}
