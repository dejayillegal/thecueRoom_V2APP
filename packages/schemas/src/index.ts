import { z } from 'zod';

export const roleEnum = z.enum(['pending', 'verified', 'moderator', 'admin']);
export const verificationStatusEnum = z.enum(['unverified', 'pending', 'verified']);
export const reactionEnum = z.enum(['❤️', '🔥', '👽', '⚡']);

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  handle: z.string().min(3),
  role: roleEnum,
  verificationStatus: verificationStatusEnum,
});
export type UserProfile = z.infer<typeof userProfileSchema>;

export const postSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string(),
  createdAt: z.date(),
});
export type Post = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string(),
  createdAt: z.date(),
});
export type Comment = z.infer<typeof commentSchema>;

export const reactionSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  type: reactionEnum,
  createdAt: z.date(),
});
export type Reaction = z.infer<typeof reactionSchema>;

export const memeSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  imageUrl: z.string().url(),
  caption: z.string().optional(),
  createdAt: z.date(),
});
export type Meme = z.infer<typeof memeSchema>;

export const trackSchema = z.object({
  id: z.string().uuid(),
  playlistId: z.string().uuid(),
  title: z.string(),
  artist: z.string(),
  url: z.string().url(),
});
export type Track = z.infer<typeof trackSchema>;

export const playlistSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
});
export type Playlist = z.infer<typeof playlistSchema>;

export const gigSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  location: z.string(),
  gigDate: z.date(),
});
export type Gig = z.infer<typeof gigSchema>;

export const newsItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string(),
  publishedAt: z.date(),
});
export type NewsItem = z.infer<typeof newsItemSchema>;
