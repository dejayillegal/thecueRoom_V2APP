'use client';

import { useEffect } from 'react';
import { basePath } from '@/lib/basePath';

export default function AuthHashRouter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const h = window.location.hash;
    if (h && h.includes('access_token')) {
      window.location.replace(`${basePath}/callback${h}`);
    }
  }, []);
  return null;
}

