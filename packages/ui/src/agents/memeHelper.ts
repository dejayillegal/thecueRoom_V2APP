export interface Meme {
  title: string;
  url: string;
}

export async function getTrendingMemes(count = 3): Promise<Meme[]> {
  const res = await fetch(`https://meme-api.com/gimme/${count}`);
  const data = await res.json();
  const list = Array.isArray(data.memes) ? data.memes : [data];
  return list.map((m: any) => ({ title: m.title, url: m.url }));
}
