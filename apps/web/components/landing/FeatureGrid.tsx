import Card from './Card';

const features = [
  {
    title: 'Curated Community',
    body: 'Join a vetted network of underground artists and fans.',
  },
  {
    title: 'Real-Time Feed',
    body: 'Stay updated with the latest drops and discussions.',
  },
  {
    title: 'Event Radar',
    body: 'Discover gigs and meetups tailored to your taste.',
  },
  {
    title: 'Collaborative Playlists',
    body: 'Build and share mixes with the community.',
  },
  {
    title: 'AI Tools',
    body: 'Leverage machine learning to surface hidden gems.',
  },
  {
    title: 'Secure Profiles',
    body: 'Own your identity with privacy-first accounts.',
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
