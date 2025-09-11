const steps = [
  'Apply or get invited by verified members',
  'Build your EPK & Stage Plot',
  'Post, reply, and discover gigs/collabs',
  'Tune your AI feed with a \'Why\' explainer',
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading">
      <h2 id="how-it-works-heading" className="mb-6 text-base font-semibold">
        How TheCueRoom Works
      </h2>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lime text-sm font-bold text-black">
              {index + 1}
            </span>
            <span className="text-sm text-muted pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}