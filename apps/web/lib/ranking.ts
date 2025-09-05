export interface Rankable {
  likes: number;
  comments: number | { length: number };
  created_at: string | Date;
}

export function score(item: Rankable): number {
  const commentCount =
    typeof item.comments === 'number' ? item.comments : item.comments.length;
  const reactions = item.likes;
  const ageHours = (Date.now() - new Date(item.created_at).getTime()) / 36e5;
  return (
    Math.log(1 + reactions) * 0.6 +
    Math.log(1 + commentCount) * 0.4 +
    1 / (1 + ageHours)
  );
}
