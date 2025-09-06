'use client';
import { useState, useEffect, FormEvent } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import type { Comment } from './FeedCard';

interface Props {
  postId: string;
  initialComments?: Comment[];
}

export default function CommentList({ postId, initialComments = [] }: Props) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');

  useEffect(() => {
    let supabase: ReturnType<typeof getBrowserClient> | null = null;
    try {
      supabase = getBrowserClient();
    } catch {
      return;
    }
    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`
        },
        (payload) => {
          const { id, body } = payload.new as { id: string; body: string };
          setComments((cs) => [...cs, { id, body }]);
        }
      )
      .subscribe();
    return () => {
      try {
        // Prefer channel API; present in Realtime
        channel?.unsubscribe?.();
        // Also call client API if available (real client in prod)
        (supabase as any)?.removeChannel?.(channel);
      } catch {
        // no-op in tests/mocks
      }
    };
  }, [postId]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setComments((cs) => [...cs, { id: Date.now().toString(), body: text }]);
    try {
      const supabase = getBrowserClient();
      await supabase.from('comments').insert({ post_id: postId, body: text });
    } catch {
      /* ignore offline */
    }
    setText('');
  };

  return (
    <div className="mt-2">
      <ul className="mb-2 space-y-1">
        {comments.map((c) => (
          <li key={c.id} className="text-sm">
            {c.body}
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="flex gap-2">
        <input
          className="flex-1 rounded border px-2 py-1 text-sm"
          placeholder="Add comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="h-8 rounded bg-blue-500 px-2 text-sm text-white">
          Post
        </button>
      </form>
    </div>
  );
}
