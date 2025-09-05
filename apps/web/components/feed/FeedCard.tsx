'use client';
import ReactionBar from './ReactionBar';
import CommentList from './CommentList';

export interface Comment {
  id: string;
  body: string;
}

export interface FeedItem {
  id: string;
  title: string;
  body: string;
  likes: number;
  comments: Comment[];
  created_at: string;
}

export default function FeedCard({ item }: { item: FeedItem }) {
  return (
    <article className="mb-4 rounded border p-4">
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="mb-2 text-sm">{item.body}</p>
      <ReactionBar postId={item.id} initialLikes={item.likes} />
      <CommentList postId={item.id} initialComments={item.comments} />
    </article>
  );
}
