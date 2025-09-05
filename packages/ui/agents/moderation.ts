const bannedWords = ['spam', 'scam', 'fake'];

export function checkText(text: string): { flagged: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const lower = text.toLowerCase();
  for (const word of bannedWords) {
    if (lower.includes(word)) reasons.push('banned_word');
  }
  if ((text.match(/https?:\/\//g) ?? []).length > 3) {
    reasons.push('too_many_links');
  }
  return { flagged: reasons.length > 0, reasons };
}
