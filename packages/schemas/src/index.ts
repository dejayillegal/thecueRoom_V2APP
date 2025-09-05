import { z } from 'zod';

export const roleEnum = z.enum(['pending', 'verified', 'moderator', 'admin']);
export const verificationEnum = z.enum([
  'pending',
  'verified',
  'rejected',
  'needs_info'
]);
export const reactionKindEnum = z.enum(['heart', 'fire', 'alien', 'bolt']);

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  handle: z.string().min(3),
  displayName: z.string(),
  bio: z.string().optional(),
  role: roleEnum,
  verificationStatus: verificationEnum,
  socials: z.record(z.string()).optional(),
  genres: z.array(z.string())
});
export type UserProfile = z.infer<typeof userProfileSchema>;

export const postSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  body: z.string(),
  mediaUrl: z.string().url().optional(),
  createdAt: z.date(),
  visibility: z.enum(['public', 'members']).default('public')
});
export type Post = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  body: z.string(),
  createdAt: z.date()
});
export type Comment = z.infer<typeof commentSchema>;

export const reactionSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid().optional(),
  commentId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  kind: reactionKindEnum,
  createdAt: z.date()
});
export type Reaction = z.infer<typeof reactionSchema>;

export const memeSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  prompt: z.string(),
  imageUrl: z.string().url(),
  createdAt: z.date()
});
export type Meme = z.infer<typeof memeSchema>;

export const playlistSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  spotifyUrl: z.string().url().optional(),
  orderIndex: z.number().int().default(0),
  updatedAt: z.date()
});
export type Playlist = z.infer<typeof playlistSchema>;

export const trackSchema = z.object({
  id: z.string().uuid(),
  playlistId: z.string().uuid(),
  title: z.string(),
  artist: z.string(),
  spotifyUrl: z.string().url().optional(),
  position: z.number().int()
});
export type Track = z.infer<typeof trackSchema>;

export const gigSchema = z.object({
  id: z.string().uuid(),
  artistId: z.string().uuid(),
  city: z.string(),
  venue: z.string(),
  startsAt: z.date(),
  lineup: z.string().optional(),
  ticketUrl: z.string().url().optional()
});
export type Gig = z.infer<typeof gigSchema>;

export const newsItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  url: z.string().url(),
  source: z.string().optional(),
  category: z.string().optional(),
  region: z.string().optional(),
  publishedAt: z.date(),
  insertedAt: z.date()
});
export type NewsItem = z.infer<typeof newsItemSchema>;

export const reportSchema = z.object({
  id: z.string().uuid(),
  targetType: z.string(),
  targetId: z.string().uuid(),
  reason: z.string().optional(),
  evidence: z.record(z.any()).optional(),
  reporterId: z.string().uuid(),
  createdAt: z.date()
});
export type Report = z.infer<typeof reportSchema>;

export const notificationPrefSchema = z.object({
  userId: z.string().uuid(),
  expoPushToken: z.string().optional(),
  categories: z.array(z.string()).default([]),
  mentions: z.boolean().default(true),
  reactions: z.boolean().default(true),
  gigs: z.boolean().default(true),
  playlists: z.boolean().default(true),
  news: z.record(z.any()).default({})
});
export type NotificationPref = z.infer<typeof notificationPrefSchema>;

export const savedItemSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.string(),
  refId: z.string().uuid(),
  createdAt: z.date()
});
export type SavedItem = z.infer<typeof savedItemSchema>;

export const messageSchema = z.object({
  id: z.string().uuid(),
  convoId: z.string().uuid(),
  senderId: z.string().uuid(),
  body: z.string(),
  createdAt: z.date()
});
export type Message = z.infer<typeof messageSchema>;

