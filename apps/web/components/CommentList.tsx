'use client';
import { useState } from 'react';
import type { Comment } from './FeedCard';

export default function CommentList({
  initialComments = []
}: {
  initialComments?: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');

  return (
    <div className="mt-2">
      <ul className="mb-2 space-y-1">
        {comments.map((c) => (
          <li key={c.id} className="text-sm">
            {c.body}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text) return;
          setComments((cs) => [...cs, { id: Date.now().toString(), body: text }]);
          setText('');
        }}
        className="flex gap-2"
      >
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
