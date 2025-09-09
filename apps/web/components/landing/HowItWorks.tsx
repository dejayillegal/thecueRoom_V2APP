const steps = [
  'Apply or get invited by verified members (about 60 seconds).',
  'Build your EPK & stage plot once—share a single link everywhere.',
  'Post, discover gigs & collaborators, and reply without the noise.',
  'Tune your feed by genre, region, and intent (networking, bookings, feedback).',
  'Free to join. You keep your rights.',
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading">
      <h2 id="how-it-works-heading" className="mb-4 text-base font-semibold">
        How TheCueRoom Works
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-lime">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </section>
  );
}
