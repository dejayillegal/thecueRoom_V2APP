
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthModal } from './AuthModal';

export function AuthHashRouter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === '1') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clean up URL without triggering navigation
    const url = new URL(window.location.href);
    url.searchParams.delete('auth');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <AuthModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
    />
  );
}
