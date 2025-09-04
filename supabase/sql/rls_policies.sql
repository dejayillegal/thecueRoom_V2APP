-- RLS policies for Supabase

-- Enable RLS on tables
alter table users enable row level security;
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;
alter table memes enable row level security;
alter table playlists enable row level security;
alter table tracks enable row level security;
alter table news enable row level security;
alter table gigs enable row level security;
alter table reports enable row level security;
alter table notification_prefs enable row level security;
alter table saved_items enable row level security;
alter table messages enable row level security;

-- Public read access
create policy "Public posts" on posts for select using (true);
create policy "Public comments" on comments for select using (true);
create policy "Public reactions" on reactions for select using (true);
create policy "Public playlists" on playlists for select using (true);
create policy "Public tracks" on tracks for select using (true);
create policy "Public news" on news for select using (true);
create policy "Public gigs" on gigs for select using (true);

-- Profiles
create policy "Profiles are public" on profiles for select using (true);
create policy "Update own profile" on profiles for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id and
    role = (select role from profiles where user_id = auth.uid()) and
    verification = (select verification from profiles where user_id = auth.uid())
  );
create policy "Admins manage profiles" on profiles for update
  using (auth.jwt() ->> 'role' = 'admin' or is_admin)
  with check (auth.jwt() ->> 'role' = 'admin' or is_admin);

-- Posts
create policy "Insert posts" on posts for insert with check (auth.role() = 'authenticated' and auth.uid() = author_id);
create policy "Update own posts" on posts for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Delete own posts" on posts for delete using (auth.uid() = author_id);
create policy "Admins manage posts" on posts for all using (auth.jwt() ->> 'role' = 'admin');

-- Comments
create policy "Insert comments" on comments for insert with check (auth.role() = 'authenticated' and auth.uid() = author_id);
create policy "Update own comments" on comments for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Delete own comments" on comments for delete using (auth.uid() = author_id);
create policy "Admins manage comments" on comments for all using (auth.jwt() ->> 'role' = 'admin');

-- Reactions
create policy "Insert reactions" on reactions for insert with check (auth.role() = 'authenticated' and auth.uid() = user_id);
create policy "Delete own reactions" on reactions for delete using (auth.uid() = user_id);
create policy "Admins manage reactions" on reactions for all using (auth.jwt() ->> 'role' = 'admin');

-- Memes
create policy "Insert memes" on memes for insert with check (auth.role() = 'authenticated' and auth.uid() = author_id);
create policy "Update own memes" on memes for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Delete own memes" on memes for delete using (auth.uid() = author_id);
create policy "Admins manage memes" on memes for all using (auth.jwt() ->> 'role' = 'admin');

-- Notification preferences
create policy "Manage own notification prefs" on notification_prefs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Admins read notification prefs" on notification_prefs for select using (auth.jwt() ->> 'role' = 'admin');

-- Saved items
create policy "Manage own saved items" on saved_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Admins read saved items" on saved_items for select using (auth.jwt() ->> 'role' = 'admin');

-- Storage buckets
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('memes', 'memes', true) on conflict do nothing;

create policy "Public read media" on storage.objects for select using (bucket_id in ('media', 'memes'));
create policy "Authenticated write media" on storage.objects for insert with check (bucket_id in ('media', 'memes') and auth.role() = 'authenticated');
create policy "Authenticated update media" on storage.objects for update
  using (bucket_id in ('media', 'memes') and auth.role() = 'authenticated')
  with check (bucket_id in ('media', 'memes') and auth.role() = 'authenticated');
create policy "Admin delete media" on storage.objects for delete using (bucket_id in ('media', 'memes') and auth.jwt() ->> 'role' = 'admin');

