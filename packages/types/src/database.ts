import { z } from 'zod';

/**
 * Base entity with common fields
 */
export const baseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * User schema
 */
export const userSchema = baseEntitySchema.extend({
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  role: z.enum(['artist', 'moderator', 'admin']).default('artist'),
  handle: z.string().min(3).max(30).optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().default(true),
  lastSeenAt: z.date().optional(),
});

/**
 * Artist profile schema
 */
export const artistProfileSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  artistName: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  genres: z.array(z.string()).default([]),
  socialLinks: z.object({
    soundcloud: z.string().url().optional(),
    bandcamp: z.string().url().optional(),
    instagram: z.string().url().optional(),
    spotify: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
  verificationStatus: z.enum(['pending', 'approved', 'rejected', 'under_review']).default('pending'),
  verifiedAt: z.date().optional(),
});

/**
 * Post schema
 */
export const postSchema = baseEntitySchema.extend({
  authorId: z.string().uuid(),
  content: z.string().min(1).max(2000),
  attachments: z.array(z.string().url()).default([]),
  likesCount: z.number().default(0),
  commentsCount: z.number().default(0),
  isPublished: z.boolean().default(true),
  isPinned: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

/**
 * Comment schema
 */
export const commentSchema = baseEntitySchema.extend({
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string().min(1).max(1000),
  parentId: z.string().uuid().optional(),
  likesCount: z.number().default(0),
  isPublished: z.boolean().default(true),
});

/**
 * Reaction schema
 */
export const reactionSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  postId: z.string().uuid().optional(),
  commentId: z.string().uuid().optional(),
  type: z.enum(['like', 'love', 'fire', 'mind_blown']).default('like'),
});

/**
 * News item schema
 */
export const newsItemSchema = baseEntitySchema.extend({
  title: z.string().min(5).max(200),
  summary: z.string().max(500).optional(),
  content: z.string().optional(),
  url: z.string().url(),
  source: z.string().max(100),
  category: z.enum(['techno', 'house', 'underground', 'industry', 'events', 'releases']),
  tags: z.array(z.string()).default([]),
  publishedAt: z.date(),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  contentHash: z.string(), // For deduplication
});

/**
 * Gig schema
 */
export const gigSchema = baseEntitySchema.extend({
  title: z.string().min(5).max(200),
  description: z.string().max(1000).optional(),
  venue: z.string().max(100),
  address: z.string().max(200),
  city: z.string().max(50).default('Bangalore'),
  startTime: z.date(),
  endTime: z.date().optional(),
  ticketUrl: z.string().url().optional(),
  genres: z.array(z.string()).default([]),
  artists: z.array(z.string()).default([]),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

/**
 * Playlist schema
 */
export const playlistSchema = baseEntitySchema.extend({
  title: z.string().min(5).max(100),
  description: z.string().max(500).optional(),
  spotifyId: z.string().optional(),
  spotifyUrl: z.string().url().optional(),
  trackCount: z.number().default(0),
  duration: z.number().default(0), // in seconds
  genres: z.array(z.string()).default([]),
  isWeekly: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  weekOf: z.date().optional(),
});

/**
 * Track schema
 */
export const trackSchema = baseEntitySchema.extend({
  playlistId: z.string().uuid(),
  spotifyId: z.string().optional(),
  title: z.string().min(1).max(200),
  artist: z.string().min(1).max(200),
  album: z.string().max(200).optional(),
  duration: z.number(), // in seconds
  spotifyUrl: z.string().url().optional(),
  previewUrl: z.string().url().optional(),
  position: z.number(),
});

/**
 * Moderation flag schema
 */
export const moderationFlagSchema = baseEntitySchema.extend({
  contentType: z.enum(['post', 'comment', 'profile', 'user']),
  contentId: z.string().uuid(),
  reporterId: z.string().uuid().optional(),
  moderatorId: z.string().uuid().optional(),
  flagType: z.enum(['spam', 'harassment', 'hate_speech', 'violence', 'nsfw', 'misinformation', 'self_promotion', 'off_topic', 'copyright_violation']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['pending', 'reviewing', 'approved', 'rejected', 'resolved']).default('pending'),
  reason: z.string().max(500).optional(),
  moderatorNotes: z.string().max(1000).optional(),
  aiScore: z.number().min(0).max(1).optional(),
  resolvedAt: z.date().optional(),
});

/**
 * Newsletter preferences schema
 */
export const newsletterPrefsSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  weeklyDigest: z.boolean().default(true),
  newsUpdates: z.boolean().default(true),
  eventAlerts: z.boolean().default(true),
  newReleases: z.boolean().default(true),
  communityHighlights: z.boolean().default(true),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
  genres: z.array(z.string()).default([]),
});

/**
 * Audit log schema
 */
export const auditLogSchema = baseEntitySchema.extend({
  userId: z.string().uuid(),
  action: z.string().max(100),
  resource: z.string().max(100),
  resourceId: z.string().uuid().optional(),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  severity: z.enum(['info', 'warning', 'error']).default('info'),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type ArtistProfile = z.infer<typeof artistProfileSchema>;
export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Reaction = z.infer<typeof reactionSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type Gig = z.infer<typeof gigSchema>;
export type Playlist = z.infer<typeof playlistSchema>;
export type Track = z.infer<typeof trackSchema>;
export type ModerationFlag = z.infer<typeof moderationFlagSchema>;
export type NewsletterPrefs = z.infer<typeof newsletterPrefsSchema>;
export type AuditLog = z.infer<typeof auditLogSchema>;