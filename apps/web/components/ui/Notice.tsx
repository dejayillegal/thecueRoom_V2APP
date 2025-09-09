import type { ReactNode } from 'react';

export const Notice = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-border bg-surface p-4 text-text">
    {children}
  </div>
);
