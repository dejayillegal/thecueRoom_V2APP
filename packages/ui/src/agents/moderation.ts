const banned = ['spam', 'scam', 'fake'];

export function moderateContent(content: string): { allowed: boolean; reason?: string } {
  const lower = content.toLowerCase();
  const hit = banned.find((word) => lower.includes(word));
  if (hit) {
    return { allowed: false, reason: `contains ${hit}` };
  }
  return { allowed: true };
}
