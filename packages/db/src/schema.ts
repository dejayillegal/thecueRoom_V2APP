import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  pgView,
  doublePrecision,
  varchar,
  real,
  index,
  uniqueIndex,
  primaryKey
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enhanced enums for underground techno/house community
export const roleEnum = pgEnum('role_enum', ['artist', 'moderator', 'admin']);
export const verificationEnum = pgEnum('verification_enum', [
  'pending',
  'verified',
  'rejected',
  'needs_info',
  'under_review'
]);
export const reactionKindEnum = pgEnum('reaction_kind_enum', ['heart', 'fire', 'alien', 'bolt']);
export const contentTypeEnum = pgEnum('content_type_enum', ['post', 'comment', 'profile', 'user']);
export const flagTypeEnum = pgEnum('flag_type_enum', [
  'spam',
  'harassment',
  'hate_speech',
  'violence',
  'nsfw',
  'misinformation',
  'self_promotion',
  'off_topic',
  'copyright_violation'
]);
export const severityEnum = pgEnum('severity_enum', ['low', 'medium', 'high', 'critical']);
export const flagStatusEnum = pgEnum('flag_status_enum', ['pending', 'reviewing', 'approved', 'rejected', 'resolved']);
export const auditSeverityEnum = pgEnum('audit_severity_enum', ['info', 'warning', 'error', 'critical']);
export const frequencyEnum = pgEnum('frequency_enum', ['daily', 'weekly', 'monthly']);
export const genreEnum = pgEnum('genre_enum', [
  'techno',
  'house',
  'minimal',
  'acid',
  'industrial',
  'ambient',
  'dub_techno',
  'detroit_techno',
  'chicago_house',
  'deep_house',
  'tech_house',
  'progressive',
  'electro',
  'breakbeat',
  'hardcore',
  'gabber',
  'experimental'
]);
export const newsCategoryEnum = pgEnum('news_category_enum', [
  'techno',
  'house',
  'underground',
  'industry',
  'events',
  'releases',
  'interviews',
  'reviews',
  'culture'
]);

// Core user table with enhanced fields
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  activeIdx: index('users_active_idx').on(table.isActive),
  lastSeenIdx: index('users_last_seen_idx').on(table.lastSeenAt)
}));

// User profiles with comprehensive underground culture support
export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  handle: varchar('handle', { length: 30 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').notNull().default('artist'),
  verification: verificationEnum('verification').notNull().default('pending'),
  isAdmin: boolean('is_admin').notNull().default(false),
  location: varchar('location', { length: 100 }),
  genres: jsonb('genres').notNull().default(sql`'[]'::jsonb`),
  socialLinks: jsonb('social_links').notNull().default(sql`'{}'::jsonb`),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  handleIdx: uniqueIndex('profiles_handle_idx').on(table.handle),
  roleIdx: index('profiles_role_idx').on(table.role),
  verificationIdx: index('profiles_verification_idx').on(table.verification),
  locationIdx: index('profiles_location_idx').on(table.location)
}));

// Posts with enhanced content support
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  attachments: jsonb('attachments').notNull().default(sql`'[]'::jsonb`),
  tags: jsonb('tags').notNull().default(sql`'[]'::jsonb`),
  visibility: varchar('visibility', { length: 20 }).notNull().default('public'),
  likesCount: integer('likes_count').notNull().default(0),
  commentsCount: integer('comments_count').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(true),
  isPinned: boolean('is_pinned').notNull().default(false),
  moderationScore: real('moderation_score'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  authorIdx: index('posts_author_idx').on(table.authorId),
  visibilityIdx: index('posts_visibility_idx').on(table.visibility),
  publishedIdx: index('posts_published_idx').on(table.isPublished),
  createdAtIdx: index('posts_created_at_idx').on(table.createdAt),
  likesIdx: index('posts_likes_idx').on(table.likesCount),
  moderationIdx: index('posts_moderation_idx').on(table.moderationScore)
}));

// Comments with thread support
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  authorId: uuid('author_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  parentId: uuid('parent_id').references(() => comments.id),
  likesCount: integer('likes_count').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(true),
  moderationScore: real('moderation_score'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  postIdx: index('comments_post_idx').on(table.postId),
  authorIdx: index('comments_author_idx').on(table.authorId),
  parentIdx: index('comments_parent_idx').on(table.parentId),
  publishedIdx: index('comments_published_idx').on(table.isPublished),
  createdAtIdx: index('comments_created_at_idx').on(table.createdAt)
}));

// Reactions with enhanced culture emojis
export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  commentId: uuid('comment_id').references(() => comments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull(),
  kind: reactionKindEnum('kind').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  postIdx: index('reactions_post_idx').on(table.postId),
  commentIdx: index('reactions_comment_idx').on(table.commentId),
  userIdx: index('reactions_user_idx').on(table.userId),
  kindIdx: index('reactions_kind_idx').on(table.kind),
  uniquePostReaction: uniqueIndex('reactions_post_user_idx').on(table.postId, table.userId),
  uniqueCommentReaction: uniqueIndex('reactions_comment_user_idx').on(table.commentId, table.userId)
}));

// Gigs with comprehensive event information
export const gigs = pgTable('gigs', {
  id: uuid('id').primaryKey().defaultRandom(),
  artistId: uuid('artist_id').references(() => profiles.userId, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  venue: varchar('venue', { length: 100 }).notNull(),
  address: varchar('address', { length: 200 }),
  city: varchar('city', { length: 50 }).notNull().default('Bangalore'),
  country: varchar('country', { length: 50 }).notNull().default('India'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }),
  ticketUrl: text('ticket_url'),
  priceRange: varchar('price_range', { length: 50 }),
  genres: jsonb('genres').notNull().default(sql`'[]'::jsonb`),
  artists: jsonb('artists').notNull().default(sql`'[]'::jsonb`),
  lineup: text('lineup'),
  capacity: integer('capacity'),
  ageRestriction: varchar('age_restriction', { length: 20 }),
  isPublished: boolean('is_published').notNull().default(true),
  isFeatured: boolean('is_featured').notNull().default(false),
  attendeeCount: integer('attendee_count').notNull().default(0),
  sourceUrl: text('source_url'),
  sourceId: varchar('source_id', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  artistIdx: index('gigs_artist_idx').on(table.artistId),
  cityIdx: index('gigs_city_idx').on(table.city),
  startTimeIdx: index('gigs_start_time_idx').on(table.startTime),
  publishedIdx: index('gigs_published_idx').on(table.isPublished),
  featuredIdx: index('gigs_featured_idx').on(table.isFeatured),
  locationIdx: index('gigs_location_idx').on(table.latitude, table.longitude)
}));

// News with comprehensive categorization
export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  summary: text('summary'),
  content: text('content'),
  url: text('url').notNull().unique(),
  source: varchar('source', { length: 100 }).notNull(),
  category: newsCategoryEnum('category').notNull(),
  tags: jsonb('tags').notNull().default(sql`'[]'::jsonb`),
  region: varchar('region', { length: 50 }),
  authorName: varchar('author_name', { length: 100 }),
  imageUrl: text('image_url'),
  contentHash: varchar('content_hash', { length: 64 }).notNull(),
  isPublished: boolean('is_published').notNull().default(true),
  isFeatured: boolean('is_featured').notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  insertedAt: timestamp('inserted_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  categoryIdx: index('news_category_idx').on(table.category),
  sourceIdx: index('news_source_idx').on(table.source),
  publishedAtIdx: index('news_published_at_idx').on(table.publishedAt),
  publishedIdx: index('news_published_idx').on(table.isPublished),
  featuredIdx: index('news_featured_idx').on(table.isFeatured),
  contentHashIdx: uniqueIndex('news_content_hash_idx').on(table.contentHash)
}));

// Playlists with comprehensive music support
export const playlists = pgTable('playlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  ownerId: uuid('owner_id').references(() => profiles.userId),
  spotifyId: varchar('spotify_id', { length: 50 }),
  spotifyUrl: text('spotify_url'),
  trackCount: integer('track_count').notNull().default(0),
  duration: integer('duration').notNull().default(0),
  genres: jsonb('genres').notNull().default(sql`'[]'::jsonb`),
  isWeekly: boolean('is_weekly').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(true),
  isFeatured: boolean('is_featured').notNull().default(false),
  weekOf: timestamp('week_of', { withTimezone: true }),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  ownerIdx: index('playlists_owner_idx').on(table.ownerId),
  weeklyIdx: index('playlists_weekly_idx').on(table.isWeekly),
  publishedIdx: index('playlists_published_idx').on(table.isPublished),
  featuredIdx: index('playlists_featured_idx').on(table.isFeatured),
  orderIdx: index('playlists_order_idx').on(table.orderIndex)
}));

// Tracks with comprehensive metadata
export const tracks = pgTable('tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  playlistId: uuid('playlist_id').references(() => playlists.id, { onDelete: 'cascade' }).notNull(),
  spotifyId: varchar('spotify_id', { length: 50 }),
  title: varchar('title', { length: 200 }).notNull(),
  artist: varchar('artist', { length: 200 }).notNull(),
  album: varchar('album', { length: 200 }),
  duration: integer('duration').notNull(),
  spotifyUrl: text('spotify_url'),
  previewUrl: text('preview_url'),
  position: integer('position').notNull(),
  genres: jsonb('genres').notNull().default(sql`'[]'::jsonb`),
  bpm: integer('bpm'),
  key: varchar('key', { length: 10 }),
  energy: real('energy'),
  danceability: real('danceability'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  playlistIdx: index('tracks_playlist_idx').on(table.playlistId),
  artistIdx: index('tracks_artist_idx').on(table.artist),
  positionIdx: index('tracks_position_idx').on(table.position),
  bpmIdx: index('tracks_bpm_idx').on(table.bpm),
  keyIdx: index('tracks_key_idx').on(table.key)
}));

// Content moderation system
export const moderationFlags = pgTable('moderation_flags', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentType: contentTypeEnum('content_type').notNull(),
  contentId: uuid('content_id').notNull(),
  reporterId: uuid('reporter_id').references(() => profiles.userId),
  moderatorId: uuid('moderator_id').references(() => profiles.userId),
  flagType: flagTypeEnum('flag_type').notNull(),
  severity: severityEnum('severity').notNull(),
  status: flagStatusEnum('status').notNull().default('pending'),
  reason: text('reason'),
  moderatorNotes: text('moderator_notes'),
  evidence: jsonb('evidence'),
  aiScore: real('ai_score'),
  autoResolved: boolean('auto_resolved').notNull().default(false),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  contentIdx: index('moderation_flags_content_idx').on(table.contentType, table.contentId),
  reporterIdx: index('moderation_flags_reporter_idx').on(table.reporterId),
  moderatorIdx: index('moderation_flags_moderator_idx').on(table.moderatorId),
  statusIdx: index('moderation_flags_status_idx').on(table.status),
  severityIdx: index('moderation_flags_severity_idx').on(table.severity),
  flagTypeIdx: index('moderation_flags_flag_type_idx').on(table.flagType),
  aiScoreIdx: index('moderation_flags_ai_score_idx').on(table.aiScore)
}));

// Newsletter preferences
export const newsletterPrefs = pgTable('newsletter_prefs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull().unique(),
  weeklyDigest: boolean('weekly_digest').notNull().default(true),
  newsUpdates: boolean('news_updates').notNull().default(true),
  eventAlerts: boolean('event_alerts').notNull().default(true),
  newReleases: boolean('new_releases').notNull().default(true),
  communityHighlights: boolean('community_highlights').notNull().default(true),
  frequency: frequencyEnum('frequency').notNull().default('weekly'),
  genres: jsonb('genres').notNull().default(sql`'[]'::jsonb`),
  emailVerified: boolean('email_verified').notNull().default(false),
  unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  userIdx: uniqueIndex('newsletter_prefs_user_idx').on(table.userId),
  frequencyIdx: index('newsletter_prefs_frequency_idx').on(table.frequency),
  unsubscribedIdx: index('newsletter_prefs_unsubscribed_idx').on(table.unsubscribedAt)
}));

// Audit logs for system tracking
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId),
  action: varchar('action', { length: 100 }).notNull(),
  resource: varchar('resource', { length: 100 }).notNull(),
  resourceId: uuid('resource_id'),
  details: jsonb('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  severity: auditSeverityEnum('severity').notNull().default('info'),
  sessionId: varchar('session_id', { length: 100 }),
  requestId: varchar('request_id', { length: 100 }),
  traceId: varchar('trace_id', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  userIdx: index('audit_logs_user_idx').on(table.userId),
  actionIdx: index('audit_logs_action_idx').on(table.action),
  resourceIdx: index('audit_logs_resource_idx').on(table.resource),
  severityIdx: index('audit_logs_severity_idx').on(table.severity),
  createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
  sessionIdx: index('audit_logs_session_idx').on(table.sessionId),
  traceIdx: index('audit_logs_trace_idx').on(table.traceId)
}));

// Artist verification workflow
export const artistVerifications = pgTable('artist_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull(),
  status: verificationEnum('status').notNull().default('pending'),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: uuid('reviewed_by').references(() => profiles.userId),
  evidence: jsonb('evidence').notNull(),
  rejectionReason: text('rejection_reason'),
  verificationNotes: text('verification_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  userIdx: index('artist_verifications_user_idx').on(table.userId),
  statusIdx: index('artist_verifications_status_idx').on(table.status),
  submittedIdx: index('artist_verifications_submitted_idx').on(table.submittedAt),
  reviewerIdx: index('artist_verifications_reviewer_idx').on(table.reviewedBy)
}));

// WebAuthn credentials for enhanced security
export const webauthnCredentials = pgTable('webauthn_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId, { onDelete: 'cascade' }).notNull(),
  credentialId: varchar('credential_id', { length: 255 }).notNull().unique(),
  publicKey: text('public_key').notNull(),
  counter: integer('counter').notNull().default(0),
  transports: jsonb('transports').notNull().default(sql`'[]'::jsonb`),
  deviceName: varchar('device_name', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
  isActive: boolean('is_active').notNull().default(true)
}, (table) => ({
  userIdx: index('webauthn_credentials_user_idx').on(table.userId),
  credentialIdIdx: uniqueIndex('webauthn_credentials_credential_id_idx').on(table.credentialId),
  activeIdx: index('webauthn_credentials_active_idx').on(table.isActive)
}));

// Enhanced post scoring view
export const postScores = pgView('post_scores', {
  postId: uuid('post_id'),
  score: doublePrecision('score'),
  reactionsCount: integer('reactions_count'),
  commentsCount: integer('comments_count'),
  hoursAge: doublePrecision('hours_age'),
  authorRole: roleEnum('author_role')
}).as(sql`
  SELECT
    p.id as post_id,
    (
      LN(1 + COALESCE(r.cnt, 0)) * 0.6 +
      LN(1 + COALESCE(c.cnt, 0)) * 0.4 +
      CASE
        WHEN pr.role IN ('moderator', 'admin') THEN 0.3
        WHEN pr.verification = 'verified' THEN 0.2
        ELSE 0
      END +
      CASE
        WHEN p.moderation_score IS NOT NULL AND p.moderation_score > 0.7 THEN -0.5
        ELSE 0
      END +
      (1.0 / (1 + EXTRACT(epoch FROM (NOW() - p.created_at)) / 3600))
    ) as score,
    COALESCE(r.cnt, 0) as reactions_count,
    COALESCE(c.cnt, 0) as comments_count,
    EXTRACT(epoch FROM (NOW() - p.created_at)) / 3600 as hours_age,
    pr.role as author_role
  FROM posts p
  LEFT JOIN profiles pr ON pr.user_id = p.author_id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as cnt FROM reactions WHERE post_id IS NOT NULL GROUP BY post_id
  ) r ON r.post_id = p.id
  LEFT JOIN (
    SELECT post_id, COUNT(*) as cnt FROM comments WHERE is_published = true GROUP BY post_id
  ) c ON c.post_id = p.id
  WHERE p.is_published = true
`);