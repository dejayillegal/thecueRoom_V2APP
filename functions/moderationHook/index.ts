import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const BANNED = ["spam", "scam", "fake"]; 

export interface ModerationResult {
  flagged: boolean;
  reasons: string[];
}

export function evaluate(text: string): ModerationResult {
  const reasons: string[] = [];
  const lower = text.toLowerCase();
  if (BANNED.some((w) => lower.includes(w))) {
    reasons.push("banned_word");
  }
  const linkCount = (text.match(/https?:\/\//g) ?? []).length;
  if (linkCount > 3) {
    reasons.push("too_many_links");
  }
  return { flagged: reasons.length > 0, reasons };
}

export async function handler(req: Request): Promise<Response> {
  const { text } = await req.json().catch(() => ({ text: "" }));
  const result = evaluate(text);
  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
}

if (import.meta.main) serve(handler);
