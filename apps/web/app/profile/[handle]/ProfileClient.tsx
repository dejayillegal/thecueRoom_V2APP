'use client';
import { useState } from 'react';
import FeedCard from '@/components/FeedCard';
import type { FeedItem } from '@/components/FeedCard';

interface Profile {
  handle: string;
  bio: string;
  posts: FeedItem[];
}

export default function ProfileClient({ profile }: { profile: Profile }) {
  const [tab, setTab] = useState<'posts' | 'about'>('posts');
  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">@{profile.handle}</h1>
      <div className="mb-4 flex gap-4 border-b pb-2">
        <button
          className={`${tab === 'posts' ? 'font-semibold' : ''} h-8 px-2`}
          onClick={() => setTab('posts')}
        >
          Posts
        </button>
        <button
          className={`${tab === 'about' ? 'font-semibold' : ''} h-8 px-2`}
          onClick={() => setTab('about')}
        >
          About
        </button>
      </div>
      {tab === 'posts' ? (
        <div>
          {profile.posts.map((p) => (
            <FeedCard key={p.id} item={p} />
          ))}
        </div>
      ) : (
        <p>{profile.bio}</p>
      )}
    </main>
  );
}
