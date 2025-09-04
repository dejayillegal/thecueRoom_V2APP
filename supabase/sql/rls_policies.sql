-- Supabase RLS and storage policies

-- Enable RLS on tables
alter table users enable row level security;
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;
alter table memes enable row level security;
alter table playlists enable row level security;
alter table tracks enable row level security;
alter table gigs enable row level security;
alter table news enable row level security;
alter table reports enable row level security;
alter table notifications_prefs enable row level security;
alter table saved_items enable row level security;
alter table messages enable row level security;

-- Users
create policy "Public read" on users for select using (true);
create policy "Insert own or admin" on users for insert with check (auth.uid() = id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on users for update using (auth.uid() = id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = id or auth.jwt() ->> 'role' = 'admin');

-- Profiles
create policy "Public read" on profiles for select using (true);
create policy "Insert own or admin" on profiles for insert with check (auth.uid() = id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on profiles for update using (auth.uid() = id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = id or auth.jwt() ->> 'role' = 'admin');

-- Posts
create policy "Public read" on posts for select using (true);
create policy "Insert own or admin" on posts for insert with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on posts for update using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on posts for delete using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');

-- Comments
create policy "Public read" on comments for select using (true);
create policy "Insert own or admin" on comments for insert with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on comments for update using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on comments for delete using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');

-- Reactions
create policy "Public read" on reactions for select using (true);
create policy "Insert own or admin" on reactions for insert with check (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on reactions for delete using (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');

-- Memes
create policy "Public read" on memes for select using (true);
create policy "Insert own or admin" on memes for insert with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on memes for update using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on memes for delete using (auth.uid() = author_id or auth.jwt() ->> 'role' = 'admin');

-- Playlists
create policy "Public read" on playlists for select using (true);
create policy "Insert own or admin" on playlists for insert with check (auth.uid() = owner_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on playlists for update using (auth.uid() = owner_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = owner_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on playlists for delete using (auth.uid() = owner_id or auth.jwt() ->> 'role' = 'admin');

-- Tracks
create policy "Public read" on tracks for select using (true);
create policy "Insert own or admin" on tracks for insert with check (
  auth.jwt() ->> 'role' = 'admin' or exists (select 1 from playlists where playlists.id = playlist_id and playlists.owner_id = auth.uid())
);
create policy "Update own or admin" on tracks for update using (
  auth.jwt() ->> 'role' = 'admin' or exists (select 1 from playlists where playlists.id = playlist_id and playlists.owner_id = auth.uid())
) with check (
  auth.jwt() ->> 'role' = 'admin' or exists (select 1 from playlists where playlists.id = playlist_id and playlists.owner_id = auth.uid())
);
create policy "Delete own or admin" on tracks for delete using (
  auth.jwt() ->> 'role' = 'admin' or exists (select 1 from playlists where playlists.id = playlist_id and playlists.owner_id = auth.uid())
);

-- Gigs
create policy "Public read" on gigs for select using (true);
create policy "Admin full access" on gigs for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');

-- News
create policy "Public read" on news for select using (true);
create policy "Admin full access" on news for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');

-- Reports
create policy "Public read" on reports for select using (true);
create policy "Insert own or admin" on reports for insert with check (auth.uid() = reporter_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on reports for update using (auth.uid() = reporter_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = reporter_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on reports for delete using (auth.uid() = reporter_id or auth.jwt() ->> 'role' = 'admin');

-- Notifications
create policy "Public read" on notifications_prefs for select using (true);
create policy "Insert own or admin" on notifications_prefs for insert with check (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');
create policy "Update own or admin" on notifications_prefs for update using (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin') with check (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on notifications_prefs for delete using (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');

-- Saved Items
create policy "Public read" on saved_items for select using (true);
create policy "Insert own or admin" on saved_items for insert with check (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');
create policy "Delete own or admin" on saved_items for delete using (auth.uid() = user_id or auth.jwt() ->> 'role' = 'admin');

-- Messages
create policy "Public read" on messages for select using (true);
create policy "Insert own or admin" on messages for insert with check (
  auth.uid() = sender_id or auth.jwt() ->> 'role' = 'admin'
);
create policy "Update own or admin" on messages for update using (
  auth.uid() in (sender_id, receiver_id) or auth.jwt() ->> 'role' = 'admin'
) with check (
  auth.uid() in (sender_id, receiver_id) or auth.jwt() ->> 'role' = 'admin'
);
create policy "Delete own or admin" on messages for delete using (
  auth.uid() in (sender_id, receiver_id) or auth.jwt() ->> 'role' = 'admin'
);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('media','media',false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('memes','memes',false) on conflict do nothing;

-- Storage policies
create policy "Public read media files" on storage.objects for select using (bucket_id in ('media','memes'));
create policy "Upload own media files" on storage.objects for insert with check (
  bucket_id in ('media','memes') and auth.uid() = owner
);
create policy "Update own media files" on storage.objects for update using (
  bucket_id in ('media','memes') and (auth.uid() = owner or auth.jwt() ->> 'role' = 'admin')
) with check (
  bucket_id in ('media','memes') and (auth.uid() = owner or auth.jwt() ->> 'role' = 'admin')
);
create policy "Delete own media files" on storage.objects for delete using (
  bucket_id in ('media','memes') and (auth.uid() = owner or auth.jwt() ->> 'role' = 'admin')
);
