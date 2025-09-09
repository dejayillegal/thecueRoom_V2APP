import type { ReactNode } from 'react';

export const Pill = ({ children }: { children: ReactNode }) => (
  <div className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-text">
    {children}
  </div>
);
