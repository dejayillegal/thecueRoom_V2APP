# Design

## Architecture
- **Web**: Vite + React + Tailwind.
- **Mobile**: Expo + React Native + Hermes.
- **Backend**: Node/Express + Drizzle ORM + Supabase Postgres.
- Shared TypeScript models ensure strict typing across packages.

## Data Model (ERD)
```
User
- id (PK)
- email
- display_name
- avatar_url

Cue
- id (PK)
- author_id (FK -> User.id)
- body
- created_at

Comment
- id (PK)
- cue_id (FK -> Cue.id)
- author_id (FK -> User.id)
- body
- created_at

MemeTemplate
- id (PK)
- title
- image_url
```

Relationships:
- User (1) --- (n) Cue
- Cue (1) --- (n) Comment
- User (1) --- (n) Comment
