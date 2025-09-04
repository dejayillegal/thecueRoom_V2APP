import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const KNOWN = [
  "bandcamp.com",
  "soundcloud.com",
  "spotify.com",
  "music.apple.com",
];

type VerifyResult = "verified" | "needs_info" | "invalid";

export function verify(url: string): VerifyResult {
  try {
    const u = new URL(url);
    if (KNOWN.some((d) => u.hostname.endsWith(d))) {
      return "verified";
    }
    return "needs_info";
  } catch {
    return "invalid";
  }
}

export async function handler(req: Request): Promise<Response> {
  const { url } = await req.json().catch(() => ({ url: "" }));
  const status = verify(url);
  return new Response(JSON.stringify({ status }), {
    headers: { "content-type": "application/json" },
  });
}

if (import.meta.main) serve(handler);
