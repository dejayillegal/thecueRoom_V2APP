import FeedClient from '@/app/feed/FeedClient';
import type { FeedItem } from '@/components/feed/FeedCard';

const FALLBACK: FeedItem[] = [
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
  if (!url || !key) return FALLBACK;
  try {
    const res = await fetch(
      `${url}/rest/v1/post_scores?select=post_id,posts(id,title,body,likes,comments,created_at)&order=score.desc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store'
      }
    );
    const data = await res.json();
    return (data as any[]).map((d) => ({
      id: d.post_id,
      ...d.posts
    })) as FeedItem[];
  } catch {
    return FALLBACK;
  }
}

export default async function FeedPage() {
  const feed = await fetchFeed();
  return <FeedClient initialItems={feed} />;
}
