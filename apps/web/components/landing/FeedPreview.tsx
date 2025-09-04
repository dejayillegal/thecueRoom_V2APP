const lines = [
  'Members share underground finds daily.',
  'Vote and comment to surface the best.',
  'Follow threads from your favorite creators.',
];

export default function FeedPreview() {
  return (
    <section
      className="rounded-md bg-surface p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      aria-labelledby="feed-preview-heading"
    >
      <h2 id="feed-preview-heading" className="mb-4 text-base font-semibold">
        Community Feed Preview
      </h2>
      <ul className="space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 flex-none bg-lime" />
            <span className="text-sm text-muted">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
