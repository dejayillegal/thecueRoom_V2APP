import type { ReactNode } from 'react';

export const Badge = ({ children }: { children: ReactNode }) => (
  <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-text">
    {children}
  </div>
);
