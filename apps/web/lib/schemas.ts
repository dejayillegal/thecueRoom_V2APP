import { z } from 'zod';

// Authentication schemas
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const codeVerificationSchema = z.object({
  code: z.string().length(6, 'Code must be exactly 6 digits').regex(/^\d{6}$/, 'Code must contain only numbers'),
});

// Profile schemas
export const profileSchema = z.object({
  artistName: z.string().min(1, 'Artist name is required').max(50, 'Artist name must be 50 characters or less'),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be 100 characters or less'),
  role: z.array(z.enum(['Producer', 'DJ', 'Live Act', 'Label'])).min(1, 'Please select at least one role'),
  inviteCode: z.string().optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

export const linksSchema = z.object({
  soundcloud: z.string().url('Please enter a valid SoundCloud URL').optional().or(z.literal('')),
  bandcamp: z.string().url('Please enter a valid Bandcamp URL').optional().or(z.literal('')),
  mixcloud: z.string().url('Please enter a valid Mixcloud URL').optional().or(z.literal('')),
  instagram: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
}).refine((data) => {
  // At least one valid link is required
  const links = Object.values(data).filter(link => link && link.length > 0);
  return links.length >= 1;
}, {
  message: 'At least one valid link is required',
  path: ['soundcloud'], // Show error on first field
});

export const genresSchema = z.object({
  primaryGenres: z.array(z.string()).min(1, 'Please select at least one primary genre').max(3, 'Maximum 3 primary genres allowed'),
  tempoRange: z.object({
    min: z.number().min(60).max(200),
    max: z.number().min(60).max(200),
  }).refine((data) => data.max >= data.min, {
    message: 'Maximum tempo must be greater than or equal to minimum tempo',
    path: ['max'],
  }),
  energy: z.enum(['Low', 'Medium', 'Peak-time']),
  influences: z.string().max(200, 'Influences must be 200 characters or less').optional(),
  subgenres: z.string().max(100, 'Subgenres must be 100 characters or less').optional(),
  clubContext: z.string().max(100, 'Club context must be 100 characters or less').optional(),
});

// Hash parsing schema for auth tokens
export const hashAuthSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().optional(),
  expires_in: z.string().optional(),
  token_type: z.string().optional(),
});

// Form validation types
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type CodeVerificationForm = z.infer<typeof codeVerificationSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type LinksForm = z.infer<typeof linksSchema>;
export type GenresForm = z.infer<typeof genresSchema>;
export type HashAuthForm = z.infer<typeof hashAuthSchema>;
import { z } from 'zod';

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z.object({
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(30, 'Handle must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Handle can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const codeVerificationSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Code must be 6 digits'),
});

// Profile schemas
export const profileSchema = z.object({
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  genres: z.array(z.enum(['techno', 'house', 'minimal', 'progressive', 'deep_house', 'tech_house']))
    .min(1, 'Select at least one genre')
    .max(3, 'Select at most 3 genres'),
  links: z.object({
    spotify: z.string().url('Invalid Spotify URL').optional().or(z.literal('')),
    soundcloud: z.string().url('Invalid SoundCloud URL').optional().or(z.literal('')),
    bandcamp: z.string().url('Invalid Bandcamp URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  }),
});

// Content schemas
export const postSchema = z.object({
  body: z.string()
    .min(1, 'Post cannot be empty')
    .max(2000, 'Post must be less than 2000 characters'),
  media_url: z.string().url('Invalid media URL').optional(),
});

export const commentSchema = z.object({
  body: z.string()
    .min(1, 'Comment cannot be empty')
    .max(500, 'Comment must be less than 500 characters'),
});

export const reportSchema = z.object({
  reason: z.enum(['spam', 'harassment', 'inappropriate', 'fake', 'other']),
  details: z.string().max(1000, 'Details must be less than 1000 characters').optional(),
});

// Gig schemas
export const gigSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  venue: z.string().min(1, 'Venue is required').max(200, 'Venue must be less than 200 characters'),
  city: z.string().default('Bangalore'),
  date: z.string().datetime('Invalid date format'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

// Playlist schemas
export const playlistSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  platform: z.enum(['spotify']),
  url: z.string().url('Invalid playlist URL'),
  week_of: z.string().datetime('Invalid date format'),
});

export const trackSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  artist: z.string().min(1, 'Artist is required').max(200, 'Artist must be less than 200 characters'),
  url: z.string().url('Invalid track URL'),
});

// Export type definitions
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type CodeVerificationForm = z.infer<typeof codeVerificationSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type PostForm = z.infer<typeof postSchema>;
export type CommentForm = z.infer<typeof commentSchema>;
export type ReportForm = z.infer<typeof reportSchema>;
export type GigForm = z.infer<typeof gigSchema>;
export type PlaylistForm = z.infer<typeof playlistSchema>;
export type TrackForm = z.infer<typeof trackSchema>;
