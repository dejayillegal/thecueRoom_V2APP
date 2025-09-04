import Link from 'next/link';

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24" aria-labelledby="cta-heading">
      <div className="rounded-md bg-surface p-8 text-center border border-white/10">
        <h2 id="cta-heading" className="text-2xl font-bold">
          Ready to dive in?
        </h2>
        <p className="mt-2 text-muted">
          Join the community or learn more about our platform.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/signup"
            className="rounded bg-lime px-6 py-3 font-bold text-black"
          >
            Join the Community
          </Link>
          <Link
            href="#learn-more"
            className="rounded border border-lime px-6 py-3 font-bold text-lime"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
