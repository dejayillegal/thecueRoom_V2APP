export interface Meme {
  title: string;
  url: string;
}

export async function getTrendingMemes(count = 3): Promise<Meme[]> {
  return Array.from({ length: count }).map((_, i) => ({
    title: `Meme ${i + 1}`,
    url: `https://example.com/meme-${i + 1}.png`,
  }));
}

export function memeHelper() {
  return { template: 'default', caption: 'funny meme' };
}
