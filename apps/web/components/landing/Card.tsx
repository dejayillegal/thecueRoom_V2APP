import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  body: ReactNode;
}

export default function Card({ title, body }: CardProps) {
  return (
    <div className="rounded-md bg-surface p-4 border border-white/10">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-muted">{body}</p>
    </div>
  );
}
