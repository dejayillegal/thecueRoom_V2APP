export interface Rankable {
  likes: number;
  comments: number | { length: number };
  created_at: string | Date;
}

export function score(item: Rankable): number {
  const commentCount =
    typeof item.comments === 'number' ? item.comments : item.comments.length;
  const ageHours = (Date.now() - new Date(item.created_at).getTime()) / 36e5;
  return item.likes * 2 + commentCount * 3 - ageHours;
}
