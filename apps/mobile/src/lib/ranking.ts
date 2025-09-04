export function hotScore(upvotes: number, createdAt: string): number {
  const ageHours = (Date.now() - new Date(createdAt).getTime()) / 3.6e6;
  return upvotes / Math.pow(ageHours + 2, 1.5);
}
