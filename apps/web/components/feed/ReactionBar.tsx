'use client';
import { useState, useEffect } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';

interface Props {
  postId: string;
  initialLikes?: number;
}

export default function ReactionBar({ postId, initialLikes = 0 }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const reduce =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let supabase: ReturnType<typeof getBrowserClient> | null = null;
    try {
      supabase = getBrowserClient();
    } catch {
      return;
    }
    const channel = supabase
      .channel('reactions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reactions',
          filter: `post_id=eq.${postId}`
        },
        () => setLikes((l) => l + 1)
      )
      .subscribe();
    return () => {
      supabase!.removeChannel(channel);
    };
  }, [postId]);

  const handleLike = async () => {
    setLikes((l) => l + 1);
    try {
      const supabase = getBrowserClient();
      await supabase.from('reactions').insert({ post_id: postId, kind: 'heart' });
    } catch {
      /* ignore offline */
    }
  };

  return (
    <div className="mb-2 flex items-center gap-2">
      <button
        type="button"
        aria-label="like"
        className="flex h-8 items-center rounded bg-gray-200 px-2 text-sm"
        onClick={handleLike}
      >
        👍 {likes}
      </button>
      {!reduce && <span className="text-xs text-gray-500">tap to cheer</span>}
    </div>
  );
}
