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
  doublePrecision
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const roleEnum = pgEnum('role_enum', ['pending', 'verified', 'moderator', 'admin']);
export const verificationEnum = pgEnum('verification_enum', [
  'pending',
  'verified',
  'rejected',
  'needs_info'
]);
export const reactionKindEnum = pgEnum('reaction_kind_enum', ['heart', 'fire', 'alien', 'bolt']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id),
  handle: text('handle').notNull().unique(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').notNull().default('pending'),
  verification: verificationEnum('verification').notNull().default('pending'),
  isAdmin: boolean('is_admin').notNull().default(false)
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => profiles.userId).notNull(),
  body: text('body').notNull(),
  mediaUrl: text('media_url'),
  visibility: text('visibility').notNull().default('public'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id).notNull(),
  authorId: uuid('author_id').references(() => profiles.userId).notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id),
  commentId: uuid('comment_id').references(() => comments.id),
  userId: uuid('user_id').references(() => profiles.userId).notNull(),
  kind: reactionKindEnum('kind').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const memes = pgTable('memes', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => profiles.userId).notNull(),
  prompt: text('prompt').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const playlists = pgTable('playlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  spotifyUrl: text('spotify_url'),
  orderIndex: integer('order_index').notNull().default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const tracks = pgTable('tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  playlistId: uuid('playlist_id').references(() => playlists.id).notNull(),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  spotifyUrl: text('spotify_url'),
  position: integer('position').notNull()
});

export const gigs = pgTable('gigs', {
  id: uuid('id').primaryKey().defaultRandom(),
  artistId: uuid('artist_id').references(() => profiles.userId).notNull(),
  city: text('city').notNull(),
  venue: text('venue').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  lineup: text('lineup'),
  ticketUrl: text('ticket_url')
});

export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  url: text('url').notNull().unique(),
  source: text('source'),
  category: text('category'),
  region: text('region'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  insertedAt: timestamp('inserted_at', { withTimezone: true }).defaultNow().notNull()
});

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  targetType: text('target_type').notNull(),
  targetId: uuid('target_id').notNull(),
  reason: text('reason'),
  evidence: jsonb('evidence'),
  reporterId: uuid('reporter_id').references(() => profiles.userId).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const notificationPrefs = pgTable('notification_prefs', {
  userId: uuid('user_id').primaryKey().references(() => profiles.userId),
  mentions: boolean('mentions').notNull().default(true),
  reactions: boolean('reactions').notNull().default(true),
  gigs: boolean('gigs').notNull().default(true),
  playlists: boolean('playlists').notNull().default(true),
  news: jsonb('news').notNull().default(sql`'{}'::jsonb`)
});

export const savedItems = pgTable('saved_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.userId).notNull(),
  type: text('type').notNull(),
  refId: uuid('ref_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  convoId: uuid('convo_id').notNull(),
  senderId: uuid('sender_id').references(() => profiles.userId).notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const postScores = pgView('post_scores', {
  postId: uuid('post_id'),
  score: doublePrecision('score')
}).as(sql`
  select
    p.id as post_id,
    ln(1 + coalesce(r.cnt, 0)) * 0.6 +
    ln(1 + coalesce(c.cnt, 0)) * 0.4 +
    1 / (1 + extract(epoch from (now() - p.created_at)) / 3600) as score
  from posts p
  left join (
    select post_id, count(*) as cnt from reactions group by post_id
  ) r on r.post_id = p.id
  left join (
    select post_id, count(*) as cnt from comments group by post_id
  ) c on c.post_id = p.id
`);

