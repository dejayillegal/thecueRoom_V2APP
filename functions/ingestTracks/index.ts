import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.42.0";

export interface Track {
  title: string;
  url: string;
  artist: string;
}

export function limitTracks(tracks: Track[]): Track[] {
  return tracks.slice(0, 50);
}

export async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    return new Response("Missing env vars", { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const body = await req.json().catch(() => ({ tracks: [] }));
  const tracks = limitTracks(Array.isArray(body.tracks) ? body.tracks : []);
  if (tracks.length) {
    const { error } = await supabase
      .from("tracks")
      .upsert(tracks, { onConflict: "url" });
    if (error) {
      return new Response(error.message, { status: 500 });
    }
  }
  return new Response(JSON.stringify({ inserted: tracks.length }), {
    headers: { "content-type": "application/json" },
  });
}

if (import.meta.main) serve(handler);
