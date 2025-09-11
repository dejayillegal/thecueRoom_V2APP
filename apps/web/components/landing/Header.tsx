import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-black/80 border-b border-neutral-800' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Logo className="h-8 w-8" />
          <span className="ml-3 text-xl font-bold text-white">thecueRoom</span>
        </div>
        <Link
          href="/login"
          className="bg-[#D1E231] px-6 py-3 font-semibold text-black transition-colors hover:bg-[#C2D629] focus:outline-none focus:ring-2 focus:ring-[#D1E231] focus:ring-offset-2 focus:ring-offset-black"
        >
          Login / Sign Up
        </Link>
      </div>
    </header>
  );
}
