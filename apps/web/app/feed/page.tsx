import FeedClient from './FeedClient';
import type { FeedItem } from '@/components/FeedCard';
import { score } from '@/lib/ranking';

const PLACEHOLDER: FeedItem[] = [
  {
    id: '1',
    title: 'Hello Cue',
    body: 'First post on the feed.',
    likes: 0,
    comments: [],
    created_at: new Date().toISOString()
  }
];

async function fetchFeed(): Promise<FeedItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return PLACEHOLDER;
  try {
    const res = await fetch(
      `${url}/rest/v1/posts?select=id,title,body,likes,comments,created_at`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store'
      }
    );
    const data = await res.json();
    return (data as FeedItem[]).sort((a, b) => score(b) - score(a));
  } catch {
    return PLACEHOLDER;
  }
}

export default async function FeedPage() {
  const feed = await fetchFeed();
  return <FeedClient initialItems={feed} />;
}
