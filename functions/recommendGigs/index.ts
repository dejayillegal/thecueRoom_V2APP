import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.42.0";

interface Gig {
  id: number;
  artist_id: number;
  city: string;
}

interface Recommendation {
  gig_id: number;
  score: number;
}

export function scoreGigs(
  gigs: Gig[],
  followed: number[],
  listened: number[],
  city?: string,
): Recommendation[] {
  return gigs
    .map((g) => {
      let score = 0;
      if (city && g.city === city) score += 5;
      if (followed.includes(g.artist_id)) score += 3;
      if (listened.includes(g.artist_id)) score += 2;
      return { gig_id: g.id, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export async function handler(req: Request): Promise<Response> {
  const { userId, city } = await req.json().catch(() => ({ userId: "", city: undefined }));
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    return new Response("Missing env vars", { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: gigs } = await supabase.from("gigs").select();
  const { data: follows } = await supabase
    .from("follows")
    .select("artist_id")
    .eq("user_id", userId);
  const { data: listens } = await supabase
    .from("listens")
    .select("artist_id")
    .eq("user_id", userId);

  const recs = scoreGigs(
    gigs ?? [],
    (follows ?? []).map((f) => f.artist_id),
    (listens ?? []).map((l) => l.artist_id),
    city,
  );
  return new Response(JSON.stringify({ recommendations: recs }), {
    headers: { "content-type": "application/json" },
  });
}

if (import.meta.main) serve(handler);
