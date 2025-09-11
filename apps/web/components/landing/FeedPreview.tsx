const feedPosts = [
  {
    author: 'Kara Nova',
    time: '2h',
    content: '"New set up on SC — jungle rollers recorded live in Mana Rainforest."'
  },
  {
    author: 'Ryan',
    time: '4h', 
    content: '"Looking for a lighting tech for Saturday\'s gig — DM me."'
  },
  {
    author: 'Sol',
    time: '6h',
    content: '"Posted a new mix: Deep night drive at 128 BPM."'
  },
];

export default function FeedPreview() {
  return (
    <section aria-labelledby="feed-preview-heading">
      <h2 id="feed-preview-heading" className="mb-6 text-base font-semibold">
        Community Feed Preview
      </h2>
      <ul className="space-y-4">
        {feedPosts.map((post, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-3 w-3 flex-none items-center justify-center rounded-full bg-lime text-[8px] text-black">
              ●
            </span>
            <div className="text-sm text-muted">
              <span className="text-white font-medium">{post.author}</span>
              <span className="text-muted"> · {post.time} — </span>
              <span>{post.content}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}