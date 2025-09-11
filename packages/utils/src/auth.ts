import { z } from 'zod';

/**
 * User role enum for authorization
 */
export const userRoleSchema = z.enum(['artist', 'moderator', 'admin']);
export type UserRole = z.infer<typeof userRoleSchema>;

/**
 * Artist verification status
 */
export const verificationStatusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
  'under_review'
]);
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;

/**
 * WebAuthn credential creation options
 */
export const webAuthnCredentialSchema = z.object({
  id: z.string(),
  rawId: z.string(),
  response: z.object({
    clientDataJSON: z.string(),
    attestationObject: z.string(),
  }),
  type: z.literal('public-key'),
});

/**
 * Session validation schema
 */
export const sessionSchema = z.object({
  userId: z.string().uuid(),
  role: userRoleSchema,
  expiresAt: z.date(),
  issuedAt: z.date(),
});

/**
 * Check if user has required role or higher
 */
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    artist: 1,
    moderator: 2,
    admin: 3,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Check if user can perform action
 */
export const canPerformAction = (
  userRole: UserRole,
  action: string,
  resourceOwner?: string,
  userId?: string
): boolean => {
  switch (action) {
    case 'create_post':
    case 'create_comment':
    case 'react_to_post':
      return hasRole(userRole, 'artist');
    
    case 'moderate_content':
    case 'approve_artist':
      return hasRole(userRole, 'moderator');
    
    case 'manage_users':
    case 'system_admin':
      return hasRole(userRole, 'admin');
    
    case 'edit_own_content':
    case 'delete_own_content':
      return resourceOwner === userId || hasRole(userRole, 'moderator');
    
    default:
      return false;
  }
};

/**
 * Generate verification challenge for artist
 */
export const generateVerificationChallenge = (): string => {
  const challenges = [
    'Create a 30-second techno track snippet',
    'Share your favorite underground venue in Bangalore',
    'Describe your music production setup',
    'Name 3 influences in underground electronic music',
    'Share a recent track you have been working on',
  ];
  
  return challenges[Math.floor(Math.random() * challenges.length)] ?? challenges[0];
};

/**
 * Artist verification data schema
 */
export const artistVerificationSchema = z.object({
  artistName: z.string().min(2).max(50),
  bio: z.string().min(10).max(500),
  genres: z.array(z.string()).min(1).max(5),
  socialLinks: z.object({
    soundcloud: z.string().url().optional(),
    bandcamp: z.string().url().optional(),
    instagram: z.string().url().optional(),
    spotify: z.string().url().optional(),
  }).optional(),
  submissionType: z.enum(['track', 'mix', 'live_set']),
  submissionUrl: z.string().url(),
  yearsActive: z.number().min(0).max(50),
  location: z.string().max(100),
});