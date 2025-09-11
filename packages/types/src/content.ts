import { z } from 'zod';

/**
 * Content visibility levels
 */
export const contentVisibilitySchema = z.enum(['public', 'members_only', 'private', 'draft']);

/**
 * Content status for moderation
 */
export const contentStatusSchema = z.enum(['published', 'pending', 'flagged', 'removed', 'archived']);

/**
 * Attachment types
 */
export const attachmentTypeSchema = z.enum(['image', 'audio', 'video', 'link', 'embed']);

export const attachmentSchema = z.object({
  id: z.string().uuid(),
  type: attachmentTypeSchema,
  url: z.string().url(),
  filename: z.string().max(255).optional(),
  mimeType: z.string().max(100).optional(),
  size: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  duration: z.number().optional(), // for audio/video
  alt: z.string().max(255).optional(),
  caption: z.string().max(500).optional(),
});

/**
 * Rich content with metadata
 */
export const richContentSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  type: z.enum(['post', 'comment', 'story', 'review', 'guide']),
  title: z.string().max(200).optional(),
  content: z.string().min(1).max(5000),
  summary: z.string().max(300).optional(),
  attachments: z.array(attachmentSchema).default([]),
  tags: z.array(z.string().max(50)).max(10).default([]),
  metadata: z.record(z.unknown()).optional(),
  visibility: contentVisibilitySchema.default('public'),
  status: contentStatusSchema.default('published'),
  featuredAt: z.date().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Content interaction schemas
 */
export const reactionTypeSchema = z.enum(['like', 'love', 'fire', 'mind_blown', 'save']);

export const contentReactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  type: reactionTypeSchema,
  createdAt: z.date(),
});

export const contentShareSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  platform: z.enum(['internal', 'twitter', 'instagram', 'facebook', 'whatsapp', 'telegram', 'copy_link']),
  createdAt: z.date(),
});

/**
 * Content collections
 */
export const collectionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false),
  itemsCount: z.number().default(0),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const collectionItemSchema = z.object({
  id: z.string().uuid(),
  collectionId: z.string().uuid(),
  contentId: z.string().uuid(),
  position: z.number(),
  note: z.string().max(200).optional(),
  addedAt: z.date(),
});

/**
 * Content analytics
 */
export const contentAnalyticsSchema = z.object({
  contentId: z.string().uuid(),
  views: z.number().default(0),
  uniqueViews: z.number().default(0),
  likes: z.number().default(0),
  comments: z.number().default(0),
  shares: z.number().default(0),
  saves: z.number().default(0),
  engagementRate: z.number().min(0).max(1).default(0),
  averageTimeSpent: z.number().default(0), // seconds
  bounceRate: z.number().min(0).max(1).default(0),
  topReferrers: z.array(z.string()).default([]),
  viewsByDate: z.record(z.number()).default({}),
  lastUpdated: z.date(),
});

/**
 * Content recommendation
 */
export const contentRecommendationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  score: z.number().min(0).max(1),
  reason: z.enum(['trending', 'similar_taste', 'followed_artist', 'popular_in_genre', 'collaborative_filtering']),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  viewedAt: z.date().optional(),
  clickedAt: z.date().optional(),
});

/**
 * Content search index
 */
export const contentSearchIndexSchema = z.object({
  contentId: z.string().uuid(),
  title: z.string().optional(),
  content: z.string(),
  tags: z.array(z.string()).default([]),
  authorName: z.string(),
  authorHandle: z.string().optional(),
  genres: z.array(z.string()).default([]),
  searchVector: z.string().optional(), // For full-text search
  boost: z.number().default(1),
  lastIndexed: z.date(),
});

/**
 * Content versioning for edit history
 */
export const contentVersionSchema = z.object({
  id: z.string().uuid(),
  contentId: z.string().uuid(),
  version: z.number(),
  title: z.string().optional(),
  content: z.string(),
  changeReason: z.string().max(200).optional(),
  changedBy: z.string().uuid(),
  changedAt: z.date(),
  diff: z.string().optional(), // JSON diff
});

// Type exports
export type ContentVisibility = z.infer<typeof contentVisibilitySchema>;
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type AttachmentType = z.infer<typeof attachmentTypeSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type RichContent = z.infer<typeof richContentSchema>;
export type ReactionType = z.infer<typeof reactionTypeSchema>;
export type ContentReaction = z.infer<typeof contentReactionSchema>;
export type ContentShare = z.infer<typeof contentShareSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionItem = z.infer<typeof collectionItemSchema>;
export type ContentAnalytics = z.infer<typeof contentAnalyticsSchema>;
export type ContentRecommendation = z.infer<typeof contentRecommendationSchema>;
export type ContentSearchIndex = z.infer<typeof contentSearchIndexSchema>;
export type ContentVersion = z.infer<typeof contentVersionSchema>;