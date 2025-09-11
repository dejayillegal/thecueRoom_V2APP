import { z } from 'zod';

/**
 * Email validation schema with stricter rules
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(254, 'Email must be less than 255 characters')
  .toLowerCase();

/**
 * Password validation schema for security
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * Handle validation for user profiles
 */
export const handleSchema = z
  .string()
  .min(3, 'Handle must be at least 3 characters')
  .max(30, 'Handle must be less than 31 characters')
  .regex(/^[a-z0-9_]+$/, 'Handle can only contain lowercase letters, numbers, and underscores')
  .transform((val) => val.toLowerCase());

/**
 * URL validation schema
 */
export const urlSchema = z.string().url('Invalid URL format');

/**
 * Optional URL schema (can be empty string)
 */
export const optionalUrlSchema = z.union([
  z.string().url('Invalid URL format'),
  z.literal(''),
  z.undefined(),
]);

/**
 * Validate content for posts/comments
 */
export const contentSchema = z
  .string()
  .min(1, 'Content cannot be empty')
  .max(2000, 'Content must be less than 2000 characters')
  .transform((val) => val.trim());

/**
 * Validate and sanitize HTML content
 */
export const sanitizeHtml = (content: string): string => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Genre validation for music categories
 */
export const genreSchema = z.enum([
  'techno',
  'house',
  'progressive-house',
  'deep-house',
  'tech-house',
  'minimal-techno',
  'acid-techno',
  'trance',
  'ambient',
  'experimental'
]);

export type Genre = z.infer<typeof genreSchema>;