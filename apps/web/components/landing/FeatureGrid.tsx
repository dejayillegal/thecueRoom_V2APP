import Card from './Card';

const features = [
  {
    title: 'AI Cover Art',
    body: 'Generate unique cover art from vibe, genre, and prompt. Shareable.',
  },
  {
    title: 'AI Meme Generator',
    body: 'Turn prompts (optional ref image) into on-brand memes—safe and shareable.',
  },
  {
    title: 'AI Artist Verification',
    body: 'Gemini-assisted checks; re-check speeds; info supported.',
  },
  {
    title: 'Secure Auth & Tiered Access',
    body: 'Private dashboard unlocks after approval; robust loading/empty/error states.',
  },
  {
    title: 'Curated News Rail',
    body: 'Categories—Electronic, Techno, House, Underground, Industry, Production/Education (regions: India/Asia/Europe).',
  },
  {
    title: 'Gig Radar',
    body: 'Discover underground gigs— Bangalore-first, global by design.',
  },
  {
    title: 'Admin Console',
    body: 'Approve artists, manage flags & content ops, monitor system health.',
  },
  {
    title: 'Invite-Only Community',
    body: 'Built for serious techno/house creators.',
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} title={feature.title} body={feature.body} />
        ))}
      </div>
    </section>
  );
}
