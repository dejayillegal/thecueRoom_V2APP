export interface NewsItem {
  id: string;
  title: string;
  url: string;
  summary: string;
  publishedAt: Date;
}

export async function getLatestNews(topic: string): Promise<NewsItem[]> {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(topic)}`
  );
  const data = await res.json();
  const hits: unknown[] = data.hits ?? [];
  return hits.slice(0, 5).map((hit: any) => ({
    id: crypto.randomUUID(),
    title: hit.title ?? 'Untitled',
    url: hit.url ?? 'https://news.ycombinator.com',
    summary: hit.story_text ?? '',
    publishedAt: hit.created_at ? new Date(hit.created_at) : new Date(),
  }));
}
