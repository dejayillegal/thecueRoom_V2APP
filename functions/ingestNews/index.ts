import { getLatestNews } from '@thecueroom/ui';
import { db, schema } from '@thecueroom/db';

export async function handler(_req: Request): Promise<Response> {
  const items = await getLatestNews('music');
  await db.insert(schema.news).values(
    items.map(({ title, url, summary, publishedAt }) => ({
      title,
      url,
      summary,
      publishedAt,
    }))
  );
  return new Response(JSON.stringify({ inserted: items.length }), {
    headers: { 'content-type': 'application/json' },
  });
}
