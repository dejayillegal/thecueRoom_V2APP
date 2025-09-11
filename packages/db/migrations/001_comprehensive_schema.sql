-- Comprehensive thecueRoom Schema Migration v1.0
-- Underground Electronic Music Culture Platform
-- Supports artist verification, content moderation, and community features

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS artist_profiles CASCADE;
DROP TABLE IF EXISTS saved_items CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS newsletter_prefs CASCADE;
DROP TABLE IF EXISTS notification_prefs CASCADE;
DROP TABLE IF EXISTS moderation_flags CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS gigs CASCADE;
DROP TABLE IF EXISTS memes CASCADE;
DROP TABLE IF EXISTS reactions CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing views
DROP VIEW IF EXISTS user_engagement CASCADE;
DROP VIEW IF EXISTS post_scores CASCADE;

-- Drop existing enums
DROP TYPE IF EXISTS audit_severity_enum CASCADE;
DROP TYPE IF EXISTS frequency_enum CASCADE;
DROP TYPE IF EXISTS flag_status_enum CASCADE;
DROP TYPE IF EXISTS severity_enum CASCADE;
DROP TYPE IF EXISTS flag_type_enum CASCADE;
DROP TYPE IF EXISTS content_type_enum CASCADE;
DROP TYPE IF EXISTS news_category_enum CASCADE;
DROP TYPE IF EXISTS genre_enum CASCADE;
DROP TYPE IF EXISTS reaction_kind_enum CASCADE;
DROP TYPE IF EXISTS verification_enum CASCADE;
DROP TYPE IF EXISTS role_enum CASCADE;

-- =====================================================
-- ENUMS FOR UNDERGROUND CULTURE PLATFORM
-- =====================================================

-- Core user roles in the underground scene
CREATE TYPE role_enum AS ENUM ('artist', 'moderator', 'admin');

-- Artist verification workflow states
CREATE TYPE verification_enum AS ENUM (
  'pending',
  'verified', 
  'rejected',
  'needs_info',
  'under_review'
);

-- Underground culture reaction types
CREATE TYPE reaction_kind_enum AS ENUM ('heart', 'fire', 'alien', 'bolt');

-- Content types for moderation
CREATE TYPE content_type_enum AS ENUM ('post', 'comment', 'profile', 'user');

-- Moderation flag types
CREATE TYPE flag_type_enum AS ENUM (
  'spam',
  'harassment',
  'hate_speech', 
  'violence',
  'nsfw',
  'misinformation',
  'self_promotion',
  'off_topic',
  'copyright_violation'
);

-- Severity levels for moderation
CREATE TYPE severity_enum AS ENUM ('low', 'medium', 'high', 'critical');

-- Moderation flag status
CREATE TYPE flag_status_enum AS ENUM ('pending', 'reviewing', 'approved', 'rejected', 'resolved');

-- Audit log severity
CREATE TYPE audit_severity_enum AS ENUM ('info', 'warning', 'error');

-- Newsletter frequency
CREATE TYPE frequency_enum AS ENUM ('daily', 'weekly', 'monthly');

-- Underground electronic music genres
CREATE TYPE genre_enum AS ENUM (
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
);

-- News categories for underground culture
CREATE TYPE news_category_enum AS ENUM (
  'techno',
  'house',
  'underground',
  'industry', 
  'events',
  'releases',
  'interviews',
  'reviews',
  'culture'
);

-- =====================================================
-- CORE USER TABLES
-- =====================================================

-- Core user authentication table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User profiles with underground culture support
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  handle VARCHAR(30) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  role role_enum NOT NULL DEFAULT 'artist',
  verification verification_enum NOT NULL DEFAULT 'pending',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  location VARCHAR(100),
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enhanced artist profiles for verification workflow
CREATE TABLE artist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(user_id) ON DELETE CASCADE,
  artist_name VARCHAR(50) NOT NULL,
  bio TEXT,
  location VARCHAR(100),
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  social_links JSONB,
  verification_status verification_enum NOT NULL DEFAULT 'pending',
  verification_submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,
  verification_evidence JSONB,
  followers_count INTEGER NOT NULL DEFAULT 0,
  releases_count INTEGER NOT NULL DEFAULT 0,
  gigs_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- CONTENT TABLES
-- =====================================================

-- Posts with enhanced underground culture support
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  visibility VARCHAR(20) NOT NULL DEFAULT 'public',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comments with thread support
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reactions with underground culture emojis
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  kind reaction_kind_enum NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Memes for underground culture content
CREATE TABLE memes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- MUSIC & EVENTS TABLES  
-- =====================================================

-- Playlists with comprehensive underground music support
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES profiles(user_id),
  spotify_id VARCHAR(50),
  spotify_url TEXT,
  track_count INTEGER NOT NULL DEFAULT 0,
  duration INTEGER NOT NULL DEFAULT 0,
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_weekly BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  week_of TIMESTAMPTZ,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tracks with comprehensive metadata
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  spotify_id VARCHAR(50),
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  album VARCHAR(200),
  duration INTEGER NOT NULL,
  spotify_url TEXT,
  preview_url TEXT,
  position INTEGER NOT NULL,
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  bpm INTEGER,
  key VARCHAR(10),
  energy REAL,
  danceability REAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gigs with comprehensive event information
CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  venue VARCHAR(100) NOT NULL,
  address VARCHAR(200),
  city VARCHAR(50) NOT NULL DEFAULT 'Bangalore',
  country VARCHAR(50) NOT NULL DEFAULT 'India',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  ticket_url TEXT,
  price_range VARCHAR(50),
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  artists JSONB NOT NULL DEFAULT '[]'::jsonb,
  lineup TEXT,
  capacity INTEGER,
  age_restriction VARCHAR(20),
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  attendee_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- News with underground culture categorization
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  summary TEXT,
  content TEXT,
  url TEXT NOT NULL UNIQUE,
  source VARCHAR(100) NOT NULL,
  category news_category_enum NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  region VARCHAR(50),
  author_name VARCHAR(100),
  image_url TEXT,
  content_hash VARCHAR(64) NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ NOT NULL,
  inserted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- MODERATION & SAFETY TABLES
-- =====================================================

-- Comprehensive content moderation system
CREATE TABLE moderation_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type content_type_enum NOT NULL,
  content_id UUID NOT NULL,
  reporter_id UUID REFERENCES profiles(user_id),
  moderator_id UUID REFERENCES profiles(user_id),
  flag_type flag_type_enum NOT NULL,
  severity severity_enum NOT NULL,
  status flag_status_enum NOT NULL DEFAULT 'pending',
  reason TEXT,
  moderator_notes TEXT,
  evidence JSONB,
  ai_score REAL,
  auto_resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Legacy reports table for backward compatibility
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT,
  evidence JSONB,
  reporter_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- USER PREFERENCES & COMMUNICATION
-- =====================================================

-- Newsletter preferences with comprehensive settings
CREATE TABLE newsletter_prefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(user_id) ON DELETE CASCADE,
  weekly_digest BOOLEAN NOT NULL DEFAULT true,
  news_updates BOOLEAN NOT NULL DEFAULT true,
  event_alerts BOOLEAN NOT NULL DEFAULT true,
  new_releases BOOLEAN NOT NULL DEFAULT true,
  community_highlights BOOLEAN NOT NULL DEFAULT true,
  frequency frequency_enum NOT NULL DEFAULT 'weekly',
  genres JSONB NOT NULL DEFAULT '[]'::jsonb,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enhanced notification preferences
CREATE TABLE notification_prefs (
  user_id UUID PRIMARY KEY REFERENCES profiles(user_id) ON DELETE CASCADE,
  mentions BOOLEAN NOT NULL DEFAULT true,
  reactions BOOLEAN NOT NULL DEFAULT true,
  gigs BOOLEAN NOT NULL DEFAULT true,
  playlists BOOLEAN NOT NULL DEFAULT true,
  news JSONB NOT NULL DEFAULT '{}'::jsonb,
  push BOOLEAN NOT NULL DEFAULT true,
  email BOOLEAN NOT NULL DEFAULT true,
  sms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enhanced messaging system
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  convo_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) NOT NULL DEFAULT 'text',
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  is_edited BOOLEAN NOT NULL DEFAULT false,
  edited_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enhanced saved items with categorization
CREATE TABLE saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  ref_id UUID NOT NULL,
  category VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comprehensive audit logging
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  severity audit_severity_enum NOT NULL DEFAULT 'info',
  session_id VARCHAR(100),
  request_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_active_idx ON users(is_active);
CREATE INDEX users_last_seen_idx ON users(last_seen_at);
CREATE INDEX users_email_active_composite_idx ON users(email, is_active);

-- Profiles indexes
CREATE UNIQUE INDEX profiles_handle_idx ON profiles(handle);
CREATE INDEX profiles_role_idx ON profiles(role);
CREATE INDEX profiles_verification_idx ON profiles(verification);
CREATE INDEX profiles_location_idx ON profiles(location);
CREATE INDEX profiles_role_verification_composite_idx ON profiles(role, verification);

-- Artist profiles indexes
CREATE UNIQUE INDEX artist_profiles_user_idx ON artist_profiles(user_id);
CREATE INDEX artist_profiles_artist_name_idx ON artist_profiles(artist_name);
CREATE INDEX artist_profiles_verification_status_idx ON artist_profiles(verification_status);
CREATE INDEX artist_profiles_location_idx ON artist_profiles(location);

-- Posts indexes
CREATE INDEX posts_author_idx ON posts(author_id);
CREATE INDEX posts_visibility_idx ON posts(visibility);
CREATE INDEX posts_published_idx ON posts(is_published);
CREATE INDEX posts_created_at_idx ON posts(created_at);
CREATE INDEX posts_likes_idx ON posts(likes_count);
CREATE INDEX posts_author_published_composite_idx ON posts(author_id, is_published);

-- Comments indexes
CREATE INDEX comments_post_idx ON comments(post_id);
CREATE INDEX comments_author_idx ON comments(author_id);
CREATE INDEX comments_parent_idx ON comments(parent_id);
CREATE INDEX comments_published_idx ON comments(is_published);
CREATE INDEX comments_created_at_idx ON comments(created_at);
CREATE INDEX comments_post_published_composite_idx ON comments(post_id, is_published);

-- Reactions indexes
CREATE INDEX reactions_post_idx ON reactions(post_id);
CREATE INDEX reactions_comment_idx ON reactions(comment_id);
CREATE INDEX reactions_user_idx ON reactions(user_id);
CREATE INDEX reactions_kind_idx ON reactions(kind);
CREATE UNIQUE INDEX reactions_post_user_idx ON reactions(post_id, user_id) WHERE post_id IS NOT NULL;
CREATE UNIQUE INDEX reactions_comment_user_idx ON reactions(comment_id, user_id) WHERE comment_id IS NOT NULL;

-- Memes indexes
CREATE INDEX memes_author_idx ON memes(author_id);
CREATE INDEX memes_published_idx ON memes(is_published);
CREATE INDEX memes_created_at_idx ON memes(created_at);

-- Playlists indexes
CREATE INDEX playlists_owner_idx ON playlists(owner_id);
CREATE INDEX playlists_weekly_idx ON playlists(is_weekly);
CREATE INDEX playlists_published_idx ON playlists(is_published);
CREATE INDEX playlists_featured_idx ON playlists(is_featured);
CREATE INDEX playlists_order_idx ON playlists(order_index);

-- Tracks indexes
CREATE INDEX tracks_playlist_idx ON tracks(playlist_id);
CREATE INDEX tracks_artist_idx ON tracks(artist);
CREATE INDEX tracks_position_idx ON tracks(position);
CREATE INDEX tracks_bpm_idx ON tracks(bpm);
CREATE INDEX tracks_key_idx ON tracks(key);

-- Gigs indexes
CREATE INDEX gigs_artist_idx ON gigs(artist_id);
CREATE INDEX gigs_city_idx ON gigs(city);
CREATE INDEX gigs_start_time_idx ON gigs(start_time);
CREATE INDEX gigs_published_idx ON gigs(is_published);
CREATE INDEX gigs_featured_idx ON gigs(is_featured);
CREATE INDEX gigs_date_city_composite_idx ON gigs(start_time, city);

-- News indexes
CREATE INDEX news_category_idx ON news(category);
CREATE INDEX news_source_idx ON news(source);
CREATE INDEX news_published_at_idx ON news(published_at);
CREATE INDEX news_published_idx ON news(is_published);
CREATE INDEX news_featured_idx ON news(is_featured);
CREATE UNIQUE INDEX news_content_hash_idx ON news(content_hash);
CREATE INDEX news_published_featured_composite_idx ON news(is_published, is_featured);

-- Moderation flags indexes
CREATE INDEX moderation_flags_content_idx ON moderation_flags(content_type, content_id);
CREATE INDEX moderation_flags_reporter_idx ON moderation_flags(reporter_id);
CREATE INDEX moderation_flags_moderator_idx ON moderation_flags(moderator_id);
CREATE INDEX moderation_flags_status_idx ON moderation_flags(status);
CREATE INDEX moderation_flags_severity_idx ON moderation_flags(severity);
CREATE INDEX moderation_flags_flag_type_idx ON moderation_flags(flag_type);
CREATE INDEX moderation_flags_ai_score_idx ON moderation_flags(ai_score);
CREATE INDEX moderation_flags_status_severity_composite_idx ON moderation_flags(status, severity);

-- Reports indexes
CREATE INDEX reports_target_idx ON reports(target_type, target_id);
CREATE INDEX reports_reporter_idx ON reports(reporter_id);

-- Newsletter preferences indexes
CREATE UNIQUE INDEX newsletter_prefs_user_idx ON newsletter_prefs(user_id);
CREATE INDEX newsletter_prefs_frequency_idx ON newsletter_prefs(frequency);
CREATE INDEX newsletter_prefs_unsubscribed_idx ON newsletter_prefs(unsubscribed_at);

-- Messages indexes
CREATE INDEX messages_convo_idx ON messages(convo_id);
CREATE INDEX messages_sender_idx ON messages(sender_id);
CREATE INDEX messages_receiver_idx ON messages(receiver_id);
CREATE INDEX messages_read_idx ON messages(is_read);
CREATE INDEX messages_created_at_idx ON messages(created_at);

-- Saved items indexes
CREATE INDEX saved_items_user_idx ON saved_items(user_id);
CREATE INDEX saved_items_type_idx ON saved_items(type);
CREATE INDEX saved_items_category_idx ON saved_items(category);
CREATE UNIQUE INDEX saved_items_user_ref_idx ON saved_items(user_id, ref_id, type);

-- Audit logs indexes
CREATE INDEX audit_logs_user_idx ON audit_logs(user_id);
CREATE INDEX audit_logs_action_idx ON audit_logs(action);
CREATE INDEX audit_logs_resource_idx ON audit_logs(resource);
CREATE INDEX audit_logs_severity_idx ON audit_logs(severity);
CREATE INDEX audit_logs_created_at_idx ON audit_logs(created_at);
CREATE INDEX audit_logs_session_idx ON audit_logs(session_id);

-- =====================================================
-- VIEWS FOR ANALYTICS & RANKING
-- =====================================================

-- Enhanced post scoring with underground culture engagement metrics
CREATE VIEW post_scores AS
SELECT
  p.id as post_id,
  ln(1 + COALESCE(r.cnt, 0)) * 0.6 +
  ln(1 + COALESCE(c.cnt, 0)) * 0.4 +
  (CASE 
    WHEN pr.role IN ('verified', 'moderator', 'admin') THEN 0.2
    ELSE 0
  END) +
  1 / (1 + EXTRACT(epoch FROM (now() - p.created_at)) / 3600) as score,
  COALESCE(r.cnt, 0) as reactions_count,
  COALESCE(c.cnt, 0) as comments_count,
  EXTRACT(epoch FROM (now() - p.created_at)) / 3600 as hours_age
FROM posts p
LEFT JOIN profiles pr ON pr.user_id = p.author_id
LEFT JOIN (
  SELECT post_id, count(*) as cnt FROM reactions WHERE post_id IS NOT NULL GROUP BY post_id
) r ON r.post_id = p.id
LEFT JOIN (
  SELECT post_id, count(*) as cnt FROM comments WHERE is_published = true GROUP BY post_id
) c ON c.post_id = p.id
WHERE p.is_published = true;

-- User engagement metrics view
CREATE VIEW user_engagement AS
SELECT
  pr.user_id,
  COALESCE(p.cnt, 0) as posts_count,
  COALESCE(c.cnt, 0) as comments_count,
  COALESCE(rg.cnt, 0) as reactions_given,
  COALESCE(rr.cnt, 0) as reactions_received,
  COALESCE(ap.followers_count, 0) as follower_count,
  (
    COALESCE(p.cnt, 0) * 2.0 +
    COALESCE(c.cnt, 0) * 1.0 +
    COALESCE(rg.cnt, 0) * 0.5 +
    COALESCE(rr.cnt, 0) * 0.8 +
    COALESCE(ap.followers_count, 0) * 0.1
  ) as engagement_score
FROM profiles pr
LEFT JOIN artist_profiles ap ON ap.user_id = pr.user_id
LEFT JOIN (
  SELECT author_id, count(*) as cnt FROM posts WHERE is_published = true GROUP BY author_id
) p ON p.author_id = pr.user_id
LEFT JOIN (
  SELECT author_id, count(*) as cnt FROM comments WHERE is_published = true GROUP BY author_id
) c ON c.author_id = pr.user_id
LEFT JOIN (
  SELECT user_id, count(*) as cnt FROM reactions GROUP BY user_id
) rg ON rg.user_id = pr.user_id
LEFT JOIN (
  SELECT p.author_id, count(r.*) as cnt 
  FROM posts p 
  JOIN reactions r ON r.post_id = p.id 
  WHERE p.is_published = true 
  GROUP BY p.author_id
) rr ON rr.author_id = pr.user_id;

-- Migration complete
INSERT INTO audit_logs (action, resource, details, severity) 
VALUES ('migration', 'database', '{"version": "001_comprehensive_schema", "timestamp": "' || now() || '"}', 'info');