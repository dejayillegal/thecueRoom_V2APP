import type { FeedItem } from '@/components/FeedCard';
import ProfileClient from './ProfileClient';

interface Profile {
  handle: string;
  bio: string;
  posts: FeedItem[];
}

const PLACEHOLDER_POST: FeedItem = {
  id: 'p1',
  title: 'First post',
  body: 'Hello world',
  likes: 0,
  comments: [],
  created_at: new Date().toISOString()
};

async function fetchProfile(handle: string): Promise<Profile> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key)
    return { handle, bio: 'Artist bio coming soon', posts: [PLACEHOLDER_POST] };
  try {
    const res = await fetch(
      `${url}/rest/v1/profiles?handle=eq.${handle}&select=handle,bio,posts`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    );
    const data = await res.json();
    return (
      data[0] || { handle, bio: 'Artist bio coming soon', posts: [PLACEHOLDER_POST] }
    );
  } catch {
    return { handle, bio: 'Artist bio coming soon', posts: [PLACEHOLDER_POST] };
  }
}

interface Params { handle: string }

export default async function ProfilePage({ params }: { params: Params }) {
  const profile = await fetchProfile(params.handle);
  return <ProfileClient profile={profile} />;
}
