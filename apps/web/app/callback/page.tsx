export const dynamic = 'force-static';

import Link from 'next/link';

export default function CallbackStaticNotice() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">Callback handled</h1>
        <p className="mt-3 text-zinc-300">
          This build is a static export (e.g., GitHub Pages). Authentication callbacks are
          handled by Supabase client flows or serverless functions in non-static deployments.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-4 py-2 rounded-lg bg-[var(--lime)] text-black font-medium"
        >
          Continue
        </Link>
      </div>
    </main>
  );
}
