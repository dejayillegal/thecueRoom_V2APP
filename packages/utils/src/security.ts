import { z } from 'zod';

/**
 * Rate limiting configuration
 */
export const rateLimitConfig = {
  login: { max: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  signup: { max: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
  post: { max: 10, windowMs: 60 * 60 * 1000 }, // 10 posts per hour
  comment: { max: 30, windowMs: 60 * 60 * 1000 }, // 30 comments per hour
  reaction: { max: 100, windowMs: 60 * 60 * 1000 }, // 100 reactions per hour
} as const;

/**
 * Content Security Policy headers - Environment-specific configurations
 */
export const cspHeaders = {
  development: {
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'img-src': "'self' data: https: blob:",
    'font-src': "'self' https://fonts.gstatic.com",
    'connect-src': "'self' https://*.supabase.co wss://*.supabase.co",
    'media-src': "'self' https:",
    'object-src': "'none'",
    'base-uri': "'self'",
    'form-action': "'self'",
    'frame-ancestors': "'none'",
  },
  production: {
    'default-src': "'self'",
    'script-src': "'self' https://vercel.live",
    'style-src': "'self' https://fonts.googleapis.com",
    'img-src': "'self' data: https: blob:",
    'font-src': "'self' https://fonts.gstatic.com",
    'connect-src': "'self' https://*.supabase.co wss://*.supabase.co",
    'media-src': "'self' https:",
    'object-src': "'none'",
    'base-uri': "'self'",
    'form-action': "'self'",
    'frame-ancestors': "'none'",
    'upgrade-insecure-requests': '',
  },
} as const;

/**
 * Get CSP header for environment
 */
export const getCspHeader = (env: 'development' | 'production' = 'production') => {
  return cspHeaders[env];
};

/**
 * Security headers for API responses
 */
export const getSecurityHeaders = (env: 'development' | 'production' = 'production') => ({
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': Object.entries(getCspHeader(env))
    .map(([key, value]) => `${key} ${value}`)
    .join('; '),
} as const);

/**
 * Validate and sanitize file uploads
 */
export const fileUploadSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().max(10 * 1024 * 1024), // 10MB max
  type: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
  ]),
});

/**
 * Generate secure random string
 * @throws {Error} If no secure random source is available
 */
export const generateSecureToken = (length = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(randomArray);
  } else if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(randomArray);
  } else {
    throw new Error('No secure random number generator available. Crypto API is required for token generation.');
  }
  
  for (let i = 0; i < length; i++) {
    result += chars[randomArray[i] % chars.length];
  }
  
  return result;
};

/**
 * Hash content for integrity checking
 */
export const hashContent = async (content: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for Node.js environments
  return content.split('').reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
  }, 0).toString(16);
};

/**
 * Validate IP address format
 */
export const ipAddressSchema = z.union([
  z.string().ip({ version: 'v4' }),
  z.string().ip({ version: 'v6' }),
]);

/**
 * User agent parsing for security logging
 */
export const parseUserAgent = (userAgent: string): { browser: string; os: string; device: string } => {
  const browser = /(?:chrome|firefox|safari|edge|opera)/i.exec(userAgent)?.[0] ?? 'unknown';
  const os = /(?:windows|mac|linux|android|ios)/i.exec(userAgent)?.[0] ?? 'unknown';
  const device = /(?:mobile|tablet|desktop)/i.exec(userAgent)?.[0] ?? 'desktop';
  
  return { browser, os, device };
};