'use client';
import { useState } from 'react';

export default function ReactionBar({ initialLikes = 0 }: { initialLikes?: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const reduce =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div className="mb-2 flex items-center gap-2">
      <button
        type="button"
        aria-label="like"
        className="flex h-8 items-center rounded bg-gray-200 px-2 text-sm"
        onClick={() => setLikes((l) => l + 1)}
      >
        👍 {likes}
      </button>
      {!reduce && <span className="text-xs text-gray-500">tap to cheer</span>}
    </div>
  );
}
