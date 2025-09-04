import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { XMLParser } from "npm:fast-xml-parser@4.2.7";

export interface NewsItem {
  title: string;
  url: string;
  summary: string;
  published_at: string;
  source: string;
  category: string;
}

export function parseRss(xml: string, source: string, category: string): NewsItem[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const data = parser.parse(xml);
  const items = data.rss?.channel?.item ?? [];
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    const url = item.link ?? item.guid;
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push({
      title: item.title ?? "",
      url,
      summary: item.description ?? "",
      published_at: new Date(item.pubDate ?? Date.now()).toISOString(),
      source,
      category,
    });
    if (out.length >= 10) break;
  }
  return out;
}

const FEEDS: Record<string, string[]> = {
  music: [
    "https://pitchfork.com/rss/news/",
    "https://www.npr.org/rss/rss.php?id=1039",
  ],
};

export async function handler(_req: Request): Promise<Response> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    return new Response("Missing env vars", { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const inserted: NewsItem[] = [];
  const globalSeen = new Set<string>();

  for (const [category, urls] of Object.entries(FEEDS)) {
    for (const url of urls) {
      try {
        const xml = await fetch(url).then((r) => r.text());
        const items = parseRss(xml, url, category).filter((i) => {
          if (globalSeen.has(i.url)) return false;
          globalSeen.add(i.url);
          return true;
        });
        if (items.length) {
          const { error } = await supabase
            .from("news")
            .upsert(items, { onConflict: "url" });
          if (error) {
            console.error(error);
          } else {
            inserted.push(...items);
          }
        }
      } catch (e) {
        console.error(`feed ${url} failed`, e);
      }
    }
  }

  return new Response(JSON.stringify({ inserted: inserted.length }), {
    headers: { "content-type": "application/json" },
  });
}

if (import.meta.main) serve(handler);
