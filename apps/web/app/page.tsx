'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { getLatestNews } from '@thecueroom/ui';
import type { NewsItem } from '@thecueroom/schemas';

export default function Page() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useEffect(() => {
    getLatestNews('music').then(setNews).catch(() => setNews([]));
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 text-center">
      <Image src="/landing.svg" alt="TheCueRoom landing hero" width={400} height={400} />
      <h1 className="text-4xl font-bold">Welcome to TheCueRoom</h1>
      {news[0] && <p className="text-sm text-foreground">{news[0].title}</p>}
      <Button>Get Started</Button>
    </main>
  );
}
