import Link from 'next/link';

export default function CtaBand({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24" aria-labelledby="cta-heading">
      <div className="rounded-md bg-surface p-8 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <h2 id="cta-heading" className="text-2xl font-bold">
          Ready to plug into the underground?
        </h2>
        <p className="mt-2 text-muted">
          Join the community, build your profile, and get seen by the right people.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onJoinClick}
            className="rounded bg-lime px-6 py-3 font-bold text-black transition-transform hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Join Free — Get Magic Link
          </button>
          <Link
            href="#how-it-works"
            className="rounded border border-lime px-6 py-3 font-bold text-lime transition-transform hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
