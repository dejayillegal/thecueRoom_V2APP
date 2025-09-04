const steps = [
  'Sign up and create your profile.',
  'Explore the feed and follow creators.',
  'Share your finds and join discussions.',
  'Attend events and grow your network.',
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading">
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
