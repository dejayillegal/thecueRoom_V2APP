'use client';
import { useEffect, useState } from 'react';
import localforage from 'localforage';
import FeedCard, { FeedItem } from '@/components/feed/FeedCard';
import { getBrowserClient } from '@/lib/supabase-browser';
import { score } from '@/lib/ranking';

export default function FeedClient({ initialItems }: { initialItems: FeedItem[] }) {
  const [items, setItems] = useState<FeedItem[]>(initialItems);

  useEffect(() => {
    async function init() {
      const cached = await localforage.getItem<{ data: FeedItem[]; ts: number }>(
        'feed'
      );
      if (cached && Date.now() - cached.ts < 1000 * 60 * 60 * 48) {
        setItems(cached.data);
      }
      try {
        const supabase = getBrowserClient();
        const { data } = await supabase
          .from('posts')
          .select('id,title,body,likes,comments,created_at');
        if (data) {
          const sorted = (data as FeedItem[]).sort((a, b) => score(b) - score(a));
          setItems(sorted);
          await localforage.setItem('feed', { data: sorted, ts: Date.now() });
        }
      } catch {
        // ignore offline errors
      }
    }
    init();
  }, [initialItems]);

  return (
    <main className="p-4">
      {items.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </main>
  );
}
