-- Row Level Security Policies for thecueRoom Underground Culture Platform
-- Comprehensive security model supporting artist/moderator/admin roles

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_prefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_prefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION auth.get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT role FROM profiles WHERE user_id = auth.uid()),
    'artist'::text
  );
$$;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM profiles WHERE user_id = auth.uid()),
    false
  );
$$;

-- Helper function to check if user is moderator or admin
CREATE OR REPLACE FUNCTION auth.is_moderator_or_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT role IN ('moderator', 'admin') OR is_admin FROM profiles WHERE user_id = auth.uid()),
    false
  );
$$;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Users can see their own data, moderators and admins can see all
CREATE POLICY "users_select_policy" ON users
  FOR SELECT
  USING (
    id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Users can update their own data, admins can update any
CREATE POLICY "users_update_policy" ON users
  FOR UPDATE
  USING (
    id = auth.uid() OR 
    auth.is_admin()
  );

-- Only authenticated users can insert (signup)
CREATE POLICY "users_insert_policy" ON users
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only admins can delete users
CREATE POLICY "users_delete_policy" ON users
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- PROFILES TABLE POLICIES
-- =====================================================

-- Public profiles are visible to everyone, private only to owner/moderators
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    auth.is_moderator_or_admin() OR
    role = 'verified'
  );

-- Users can update their own profile, moderators can update verification status
CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE
  USING (
    user_id = auth.uid() OR 
    (auth.is_moderator_or_admin() AND 
     COALESCE(OLD.role, 'artist') != 'admin')
  );

-- Users can create their own profile
CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Only admins can delete profiles
CREATE POLICY "profiles_delete_policy" ON profiles
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- ARTIST PROFILES TABLE POLICIES
-- =====================================================

-- Artist profiles visible to everyone for verified artists, own profile always visible
CREATE POLICY "artist_profiles_select_policy" ON artist_profiles
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    auth.is_moderator_or_admin() OR
    verification_status = 'verified'
  );

-- Artists can update their own profile, moderators can update verification
CREATE POLICY "artist_profiles_update_policy" ON artist_profiles
  FOR UPDATE
  USING (
    user_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Artists can create their own profile
CREATE POLICY "artist_profiles_insert_policy" ON artist_profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Only admins can delete artist profiles
CREATE POLICY "artist_profiles_delete_policy" ON artist_profiles
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- POSTS TABLE POLICIES
-- =====================================================

-- Published posts visible to everyone, own posts always visible
CREATE POLICY "posts_select_policy" ON posts
  FOR SELECT
  USING (
    (is_published = true AND visibility = 'public') OR
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Users can update their own posts, moderators can moderate
CREATE POLICY "posts_update_policy" ON posts
  FOR UPDATE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Verified artists and above can create posts
CREATE POLICY "posts_insert_policy" ON posts
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (auth.get_user_role() IN ('verified', 'moderator', 'admin') OR
     auth.is_admin())
  );

-- Users can delete their own posts, moderators can delete any
CREATE POLICY "posts_delete_policy" ON posts
  FOR DELETE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- =====================================================
-- COMMENTS TABLE POLICIES
-- =====================================================

-- Published comments visible to everyone, own comments always visible
CREATE POLICY "comments_select_policy" ON comments
  FOR SELECT
  USING (
    is_published = true OR
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Users can update their own comments, moderators can moderate
CREATE POLICY "comments_update_policy" ON comments
  FOR UPDATE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Authenticated users can create comments
CREATE POLICY "comments_insert_policy" ON comments
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can delete their own comments, moderators can delete any
CREATE POLICY "comments_delete_policy" ON comments
  FOR DELETE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- =====================================================
-- REACTIONS TABLE POLICIES
-- =====================================================

-- Reactions visible to everyone
CREATE POLICY "reactions_select_policy" ON reactions
  FOR SELECT
  USING (true);

-- Users can update/delete their own reactions
CREATE POLICY "reactions_update_policy" ON reactions
  FOR UPDATE
  USING (user_id = auth.uid() OR auth.is_moderator_or_admin());

-- Authenticated users can create reactions
CREATE POLICY "reactions_insert_policy" ON reactions
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Users can delete their own reactions, moderators can delete any
CREATE POLICY "reactions_delete_policy" ON reactions
  FOR DELETE
  USING (
    user_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- =====================================================
-- MEMES TABLE POLICIES
-- =====================================================

-- Published memes visible to everyone
CREATE POLICY "memes_select_policy" ON memes
  FOR SELECT
  USING (
    is_published = true OR
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Users can update their own memes, moderators can moderate
CREATE POLICY "memes_update_policy" ON memes
  FOR UPDATE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Verified artists can create memes
CREATE POLICY "memes_insert_policy" ON memes
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (auth.get_user_role() IN ('verified', 'moderator', 'admin') OR
     auth.is_admin())
  );

-- Users can delete their own memes, moderators can delete any
CREATE POLICY "memes_delete_policy" ON memes
  FOR DELETE
  USING (
    author_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- =====================================================
-- PLAYLISTS TABLE POLICIES
-- =====================================================

-- Published playlists visible to everyone
CREATE POLICY "playlists_select_policy" ON playlists
  FOR SELECT
  USING (
    is_published = true OR
    owner_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Owners and moderators can update
CREATE POLICY "playlists_update_policy" ON playlists
  FOR UPDATE
  USING (
    owner_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Verified artists can create playlists
CREATE POLICY "playlists_insert_policy" ON playlists
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (auth.get_user_role() IN ('verified', 'moderator', 'admin') OR
     auth.is_admin())
  );

-- Owners and admins can delete
CREATE POLICY "playlists_delete_policy" ON playlists
  FOR DELETE
  USING (
    owner_id = auth.uid() OR 
    auth.is_admin()
  );

-- =====================================================
-- TRACKS TABLE POLICIES
-- =====================================================

-- Tracks follow playlist visibility
CREATE POLICY "tracks_select_policy" ON tracks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM playlists p 
      WHERE p.id = tracks.playlist_id 
      AND (p.is_published = true OR p.owner_id = auth.uid() OR auth.is_moderator_or_admin())
    )
  );

-- Playlist owners and moderators can manage tracks
CREATE POLICY "tracks_update_policy" ON tracks
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM playlists p 
      WHERE p.id = tracks.playlist_id 
      AND (p.owner_id = auth.uid() OR auth.is_moderator_or_admin())
    )
  );

CREATE POLICY "tracks_insert_policy" ON tracks
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists p 
      WHERE p.id = tracks.playlist_id 
      AND (p.owner_id = auth.uid() OR auth.is_moderator_or_admin())
    )
  );

CREATE POLICY "tracks_delete_policy" ON tracks
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM playlists p 
      WHERE p.id = tracks.playlist_id 
      AND (p.owner_id = auth.uid() OR auth.is_admin())
    )
  );

-- =====================================================
-- GIGS TABLE POLICIES
-- =====================================================

-- Published gigs visible to everyone
CREATE POLICY "gigs_select_policy" ON gigs
  FOR SELECT
  USING (
    is_published = true OR
    artist_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Artists can update their own gigs, moderators can moderate
CREATE POLICY "gigs_update_policy" ON gigs
  FOR UPDATE
  USING (
    artist_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Verified artists can create gigs
CREATE POLICY "gigs_insert_policy" ON gigs
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (auth.get_user_role() IN ('verified', 'moderator', 'admin') OR
     auth.is_admin()) AND
    artist_id = auth.uid()
  );

-- Artists and admins can delete gigs
CREATE POLICY "gigs_delete_policy" ON gigs
  FOR DELETE
  USING (
    artist_id = auth.uid() OR 
    auth.is_admin()
  );

-- =====================================================
-- NEWS TABLE POLICIES
-- =====================================================

-- Published news visible to everyone
CREATE POLICY "news_select_policy" ON news
  FOR SELECT
  USING (
    is_published = true OR 
    auth.is_moderator_or_admin()
  );

-- Only moderators and admins can manage news
CREATE POLICY "news_update_policy" ON news
  FOR UPDATE
  USING (auth.is_moderator_or_admin());

CREATE POLICY "news_insert_policy" ON news
  FOR INSERT
  WITH CHECK (auth.is_moderator_or_admin());

CREATE POLICY "news_delete_policy" ON news
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- MODERATION FLAGS TABLE POLICIES
-- =====================================================

-- Only moderators and admins can see moderation flags
CREATE POLICY "moderation_flags_select_policy" ON moderation_flags
  FOR SELECT
  USING (
    reporter_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Moderators can update flags
CREATE POLICY "moderation_flags_update_policy" ON moderation_flags
  FOR UPDATE
  USING (auth.is_moderator_or_admin());

-- Authenticated users can create reports
CREATE POLICY "moderation_flags_insert_policy" ON moderation_flags
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (reporter_id = auth.uid() OR auth.is_moderator_or_admin())
  );

-- Only admins can delete moderation flags
CREATE POLICY "moderation_flags_delete_policy" ON moderation_flags
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- REPORTS TABLE POLICIES (Legacy)
-- =====================================================

-- Users can see their own reports, moderators see all
CREATE POLICY "reports_select_policy" ON reports
  FOR SELECT
  USING (
    reporter_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Only moderators can update reports
CREATE POLICY "reports_update_policy" ON reports
  FOR UPDATE
  USING (auth.is_moderator_or_admin());

-- Authenticated users can create reports
CREATE POLICY "reports_insert_policy" ON reports
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    reporter_id = auth.uid()
  );

-- Only admins can delete reports
CREATE POLICY "reports_delete_policy" ON reports
  FOR DELETE
  USING (auth.is_admin());

-- =====================================================
-- NEWSLETTER PREFERENCES TABLE POLICIES
-- =====================================================

-- Users can see their own preferences, admins see all
CREATE POLICY "newsletter_prefs_select_policy" ON newsletter_prefs
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can update their own preferences
CREATE POLICY "newsletter_prefs_update_policy" ON newsletter_prefs
  FOR UPDATE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can create their own preferences
CREATE POLICY "newsletter_prefs_insert_policy" ON newsletter_prefs
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    user_id = auth.uid()
  );

-- Users can delete their own preferences
CREATE POLICY "newsletter_prefs_delete_policy" ON newsletter_prefs
  FOR DELETE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- =====================================================
-- NOTIFICATION PREFERENCES TABLE POLICIES
-- =====================================================

-- Users can see their own preferences, admins see all
CREATE POLICY "notification_prefs_select_policy" ON notification_prefs
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can update their own preferences
CREATE POLICY "notification_prefs_update_policy" ON notification_prefs
  FOR UPDATE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can create their own preferences
CREATE POLICY "notification_prefs_insert_policy" ON notification_prefs
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    user_id = auth.uid()
  );

-- Users can delete their own preferences
CREATE POLICY "notification_prefs_delete_policy" ON notification_prefs
  FOR DELETE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- =====================================================
-- SAVED ITEMS TABLE POLICIES
-- =====================================================

-- Users can see their own saved items
CREATE POLICY "saved_items_select_policy" ON saved_items
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can update their own saved items
CREATE POLICY "saved_items_update_policy" ON saved_items
  FOR UPDATE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- Users can create their own saved items
CREATE POLICY "saved_items_insert_policy" ON saved_items
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    user_id = auth.uid()
  );

-- Users can delete their own saved items
CREATE POLICY "saved_items_delete_policy" ON saved_items
  FOR DELETE
  USING (
    user_id = auth.uid() OR 
    auth.is_admin()
  );

-- =====================================================
-- MESSAGES TABLE POLICIES
-- =====================================================

-- Users can see messages they sent or received
CREATE POLICY "messages_select_policy" ON messages
  FOR SELECT
  USING (
    sender_id = auth.uid() OR 
    receiver_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Users can update their own messages, moderators can moderate
CREATE POLICY "messages_update_policy" ON messages
  FOR UPDATE
  USING (
    sender_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- Authenticated users can send messages
CREATE POLICY "messages_insert_policy" ON messages
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    sender_id = auth.uid()
  );

-- Users can delete their own messages, moderators can delete any
CREATE POLICY "messages_delete_policy" ON messages
  FOR DELETE
  USING (
    sender_id = auth.uid() OR 
    auth.is_moderator_or_admin()
  );

-- =====================================================
-- AUDIT LOGS TABLE POLICIES
-- =====================================================

-- Only admins can see audit logs
CREATE POLICY "audit_logs_select_policy" ON audit_logs
  FOR SELECT
  USING (auth.is_admin());

-- Only system can insert audit logs (no user updates)
CREATE POLICY "audit_logs_insert_policy" ON audit_logs
  FOR INSERT
  WITH CHECK (auth.is_admin());

-- No updates allowed on audit logs
-- No delete policy - audit logs are immutable

-- =====================================================
-- ADDITIONAL SECURITY FUNCTIONS
-- =====================================================

-- Function to log user actions for audit
CREATE OR REPLACE FUNCTION log_user_action(
  action_name text,
  resource_name text,
  resource_id uuid DEFAULT NULL,
  action_details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    resource,
    resource_id,
    details,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    auth.uid(),
    action_name,
    resource_name,
    resource_id,
    action_details,
    inet_client_addr()::text,
    current_setting('request.header.user-agent', true),
    now()
  );
END;
$$;

-- Function to check content moderation status
CREATE OR REPLACE FUNCTION is_content_flagged(
  content_type text,
  content_id uuid
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM moderation_flags 
    WHERE content_type = $1 
    AND content_id = $2 
    AND status IN ('approved', 'reviewing')
    AND severity IN ('high', 'critical')
  );
$$;

-- Function to auto-moderate content based on AI score
CREATE OR REPLACE FUNCTION auto_moderate_content()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Auto-flag content with high AI moderation score
  IF NEW.ai_score IS NOT NULL AND NEW.ai_score > 0.8 THEN
    NEW.status := 'reviewing';
    NEW.auto_resolved := true;
  END IF;
  
  -- Auto-approve content with very low AI score from verified users
  IF NEW.ai_score IS NOT NULL AND NEW.ai_score < 0.1 AND 
     EXISTS (SELECT 1 FROM profiles p WHERE p.user_id = NEW.reporter_id AND p.role = 'verified') THEN
    NEW.status := 'rejected';
    NEW.auto_resolved := true;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply auto-moderation trigger
CREATE TRIGGER moderation_flags_auto_moderate
  BEFORE INSERT OR UPDATE ON moderation_flags
  FOR EACH ROW
  EXECUTE FUNCTION auto_moderate_content();

-- Grants for authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grants for anonymous users (limited read access)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON profiles, posts, comments, reactions, memes, playlists, tracks, gigs, news TO anon;

-- Additional security: Prevent privilege escalation
CREATE POLICY "prevent_role_escalation" ON profiles
  FOR UPDATE
  USING (
    -- Users cannot make themselves admin or change role above their current level
    CASE 
      WHEN auth.is_admin() THEN true
      WHEN auth.get_user_role() = 'moderator' AND NEW.role != 'admin' AND NEW.is_admin = false THEN true
      WHEN user_id = auth.uid() AND OLD.role = NEW.role AND OLD.is_admin = NEW.is_admin THEN true
      ELSE false
    END
  );