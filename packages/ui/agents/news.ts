export interface NewsRule {
  category: string;
  keywords: string[];
}

const RULES: NewsRule[] = [
  { category: 'music', keywords: ['album', 'song', 'tour'] },
  { category: 'tech', keywords: ['ai', 'software', 'hardware'] },
];

export function categorize(title: string): string {
  for (const rule of RULES) {
    if (rule.keywords.some((k) => title.toLowerCase().includes(k))) {
      return rule.category;
    }
  }
  return 'general';
}
