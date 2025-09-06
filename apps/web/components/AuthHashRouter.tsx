'use client';

import { useEffect } from 'react';

export default function AuthHashRouter({ callbackPath }: { callbackPath: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const h = window.location.hash;
    if (h && h.includes('access_token')) {
      const target = `${callbackPath}${h}`;
      window.location.replace(target);
    }
  }, [callbackPath]);
  return null;
}

