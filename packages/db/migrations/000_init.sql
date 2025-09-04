-- Initial schema for TheCueRoom

-- Enums
create type if not exists role_enum as enum ('pending','verified','moderator','admin');
create type if not exists verification_enum as enum ('pending','verified','rejected','needs_info');
create type if not exists reaction_kind_enum as enum ('heart','fire','alien','bolt');

-- Tables
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text,
  created_at timestamptz default now()
);

create table if not exists profiles (
  user_id uuid primary key references users(id),
  handle text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  role role_enum not null default 'pending',
  verification verification_enum not null default 'pending',
  is_admin boolean not null default false
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(user_id),
  body text not null,
  media_url text,
  visibility text not null default 'public',
  created_at timestamptz not null default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  author_id uuid references profiles(user_id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  comment_id uuid references comments(id),
  user_id uuid references profiles(user_id),
  kind reaction_kind_enum not null,
  created_at timestamptz not null default now()
);

create table if not exists memes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(user_id),
  prompt text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  spotify_url text,
  order_index int default 0,
  updated_at timestamptz not null default now()
);

create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid references playlists(id),
  title text not null,
  artist text not null,
  spotify_url text,
  position int not null
);

create table if not exists gigs (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references profiles(user_id),
  city text not null,
  venue text not null,
  starts_at timestamptz not null,
  lineup text,
  ticket_url text
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text unique not null,
  source text,
  category text,
  region text,
  published_at timestamptz,
  inserted_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id uuid not null,
  reason text,
  evidence jsonb,
  reporter_id uuid references profiles(user_id),
  created_at timestamptz not null default now()
);

create table if not exists notification_prefs (
  user_id uuid primary key references profiles(user_id),
  mentions boolean not null default true,
  reactions boolean not null default true,
  gigs boolean not null default true,
  playlists boolean not null default true,
  news jsonb not null default '{}'::jsonb
);

create table if not exists saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  type text not null,
  ref_id uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  convo_id uuid not null,
  sender_id uuid references profiles(user_id),
  body text not null,
  created_at timestamptz not null default now()
);

-- View
create or replace view post_scores as
  select
    p.id as post_id,
    ln(1 + coalesce(r.cnt,0)) * 0.6 +
    ln(1 + coalesce(c.cnt,0)) * 0.4 +
    1 / (1 + extract(epoch from (now() - p.created_at)) / 3600) as score
  from posts p
  left join (
    select post_id, count(*) as cnt from reactions group by post_id
  ) r on r.post_id = p.id
  left join (
    select post_id, count(*) as cnt from comments group by post_id
  ) c on c.post_id = p.id;

