export interface NewsItem {
  id: string;
  title: string;
  url: string;
  summary: string;
  publishedAt: Date;
}

export async function getLatestNews(topic: string): Promise<NewsItem[]> {
  return [
    {
      id: '1',
      title: `Top story about ${topic}`,
      url: '#',
      summary: 'Sample news summary.',
      publishedAt: new Date(),
    },
  ];
}

export async function newsCurator() {
  return getLatestNews('cue');
}
