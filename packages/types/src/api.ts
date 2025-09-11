import { z } from 'zod';

/**
 * API Response wrapper
 */
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.date(),
});

/**
 * Paginated response
 */
export const paginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) => z.object({
  items: z.array(itemSchema),
  pagination: z.object({
    page: z.number().min(1),
    limit: z.number().min(1).max(100),
    total: z.number().min(0),
    totalPages: z.number().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

/**
 * Error response schema
 */
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.date(),
});

/**
 * Authentication request/response
 */
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional(),
});

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  handle: z.string().min(3).max(30).optional(),
});

export const authResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    role: z.enum(['artist', 'moderator', 'admin']),
    handle: z.string().optional(),
    avatar: z.string().url().optional(),
    isVerified: z.boolean(),
  }),
  session: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAt: z.date(),
  }),
});

/**
 * Content creation/update requests
 */
export const createPostRequestSchema = z.object({
  content: z.string().min(1).max(2000),
  attachments: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  isDraft: z.boolean().optional(),
});

export const updatePostRequestSchema = createPostRequestSchema.partial();

export const createCommentRequestSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1).max(1000),
  parentId: z.string().uuid().optional(),
});

/**
 * Artist verification request
 */
export const artistVerificationRequestSchema = z.object({
  artistName: z.string().min(2).max(50),
  bio: z.string().min(10).max(500),
  genres: z.array(z.string()).min(1).max(5),
  socialLinks: z.object({
    soundcloud: z.string().url().optional(),
    bandcamp: z.string().url().optional(),
    instagram: z.string().url().optional(),
    spotify: z.string().url().optional(),
  }).optional(),
  submissionType: z.enum(['track', 'mix', 'live_set']),
  submissionUrl: z.string().url(),
  yearsActive: z.number().min(0).max(50),
  location: z.string().max(100),
});

/**
 * Moderation requests
 */
export const reportContentRequestSchema = z.object({
  contentType: z.enum(['post', 'comment', 'profile', 'user']),
  contentId: z.string().uuid(),
  flagType: z.enum(['spam', 'harassment', 'hate_speech', 'violence', 'nsfw', 'misinformation', 'self_promotion', 'off_topic', 'copyright_violation']),
  reason: z.string().max(500).optional(),
});

export const moderationActionRequestSchema = z.object({
  flagId: z.string().uuid(),
  action: z.enum(['approve', 'reject', 'remove', 'warn', 'suspend', 'ban']),
  reason: z.string().max(500).optional(),
  duration: z.number().optional(), // For suspensions (hours)
});

/**
 * Search and filtering
 */
export const searchRequestSchema = z.object({
  query: z.string().min(1).max(100),
  type: z.enum(['posts', 'users', 'gigs', 'news', 'playlists']).optional(),
  filters: z.object({
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
    genres: z.array(z.string()).optional(),
    location: z.string().optional(),
    verified: z.boolean().optional(),
  }).optional(),
  sort: z.enum(['relevance', 'date', 'popularity']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(50).optional(),
});

/**
 * Newsletter subscription
 */
export const newsletterPrefsRequestSchema = z.object({
  weeklyDigest: z.boolean().optional(),
  newsUpdates: z.boolean().optional(),
  eventAlerts: z.boolean().optional(),
  newReleases: z.boolean().optional(),
  communityHighlights: z.boolean().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  genres: z.array(z.string()).optional(),
});

/**
 * File upload request
 */
export const fileUploadRequestSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().max(10 * 1024 * 1024), // 10MB
  mimeType: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
  ]),
  purpose: z.enum(['avatar', 'post_attachment', 'cover_art', 'audio_submission']),
});

// Type exports
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodType<T>>>>;
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type SignupRequest = z.infer<typeof signupRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;
export type UpdatePostRequest = z.infer<typeof updatePostRequestSchema>;
export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;
export type ArtistVerificationRequest = z.infer<typeof artistVerificationRequestSchema>;
export type ReportContentRequest = z.infer<typeof reportContentRequestSchema>;
export type ModerationActionRequest = z.infer<typeof moderationActionRequestSchema>;
export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type NewsletterPrefsRequest = z.infer<typeof newsletterPrefsRequestSchema>;
export type FileUploadRequest = z.infer<typeof fileUploadRequestSchema>;