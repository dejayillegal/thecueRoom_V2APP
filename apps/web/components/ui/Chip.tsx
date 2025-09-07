import type { ReactNode } from 'react';

export const Chip = ({ children }: { children: ReactNode }) => (
  <div className="inline-block rounded-md bg-surface px-3 py-1 text-sm text-text">
    {children}
  </div>
);
