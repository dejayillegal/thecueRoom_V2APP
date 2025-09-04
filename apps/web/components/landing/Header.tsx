import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="py-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <Logo className="h-6 w-6" />
        <Link
          href="/login"
          className="rounded bg-lime px-4 py-2 font-bold text-black"
        >
          Login / Sign Up
        </Link>
      </div>
    </header>
  );
}
