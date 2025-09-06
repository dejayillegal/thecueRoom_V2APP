import Card from './Card';

const features = [
  {
    title: 'AI Cover Art',
    body: 'Ship on-brand covers from vibe + genre in under a minute. Full-res exports—yours to use.',
  },
  {
    title: 'Meme Studio',
    body: 'Turn moments (or an optional image) into shareable, on-brand memes that actually get reposted.',
  },
  {
    title: 'Artist Verification',
    body: 'Vetted profiles and invite flow help you avoid fakes and spam. Look credible when you pitch.',
  },
  {
    title: 'Private & Tiered Access',
    body: 'Verified-first spaces, content flags, and mod tools keep the feed useful—and the culture clean.',
  },
  {
    title: 'Curated News Rail',
    body: 'Underground sources only. No SEO sludge. Scene-relevant drops for your region.',
  },
  {
    title: 'Gig Radar',
    body: 'Find and promote events. Filter by city/region and DM promoters who are open to pitches.',
  },
  {
    title: 'Creator Dashboard',
    body: 'One place for your EPK, stage plot, links, and posts. Share a single link that stays current.',
  },
  {
    title: 'Invite-Only Community',
    body: 'Built for serious techno/house creators. Fewer tourists, more people who actually ship.',
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="learn-more"
      className="mx-auto max-w-[1200px] px-6 py-24"
      aria-labelledby="features-heading"
    >
      <p id="features-heading" className="label mb-6">
        What you get
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} title={feature.title} body={feature.body} />
        ))}
      </div>
    </section>
  );
}
