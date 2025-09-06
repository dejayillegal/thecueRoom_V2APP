const lines = [
  '"New live set—jungle rollers recorded in Mana Rainforest."',
  '"Looking for lighting tech for Saturday’s gig — DM me."',
  '"Posted a deep-night drive mix at 128 BPM."',
];

export default function FeedPreview() {
  return (
    <section
      className="rounded-md bg-surface p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      aria-labelledby="feed-preview-heading"
    >
      <h2 id="feed-preview-heading" className="mb-4 text-base font-semibold">
        A vetted feed—no spam, no bots. What members are posting:
      </h2>
      <ul className="space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-3 w-3 flex-none items-center justify-center rounded-full bg-lime text-[8px] text-black">
              ✓
            </span>
            <span className="text-sm text-muted">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
