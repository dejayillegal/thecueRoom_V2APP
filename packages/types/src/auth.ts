
import { z } from 'zod';

/**
 * Enhanced WebAuthn credential schemas
 */
export const webAuthnCredentialCreationOptionsSchema = z.object({
  challenge: z.string(),
  rp: z.object({
    name: z.string(),
    id: z.string(),
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
  }),
  pubKeyCredParams: z.array(z.object({
    type: z.literal('public-key'),
    alg: z.number(),
  })),
  authenticatorSelection: z.object({
    authenticatorAttachment: z.enum(['platform', 'cross-platform']).optional(),
    userVerification: z.enum(['required', 'preferred', 'discouraged']),
    requireResidentKey: z.boolean().optional(),
  }).optional(),
  timeout: z.number().optional(),
  attestation: z.enum(['none', 'indirect', 'direct', 'enterprise']).optional(),
});

export const webAuthnCredentialRequestOptionsSchema = z.object({
  challenge: z.string(),
  rpId: z.string().optional(),
  allowCredentials: z.array(z.object({
    type: z.literal('public-key'),
    id: z.string(),
    transports: z.array(z.enum(['usb', 'nfc', 'ble', 'internal'])).optional(),
  })).optional(),
  userVerification: z.enum(['required', 'preferred', 'discouraged']).optional(),
  timeout: z.number().optional(),
});

export const webAuthnCredentialSchema = z.object({
  id: z.string(),
  rawId: z.string(),
  response: z.object({
    clientDataJSON: z.string(),
    attestationObject: z.string().optional(),
    authenticatorData: z.string().optional(),
    signature: z.string().optional(),
    userHandle: z.string().optional(),
  }),
  type: z.literal('public-key'),
  clientExtensionResults: z.record(z.unknown()).optional(),
});

/**
 * Artist verification schemas
 */
export const artistVerificationSubmissionSchema = z.object({
  socialLinks: z.array(z.object({
    platform: z.enum(['soundcloud', 'bandcamp', 'spotify', 'youtube', 'instagram', 'facebook']),
    url: z.string().url(),
    verified: z.boolean().default(false)
  })).min(1),
  musicLinks: z.array(z.object({
    platform: z.enum(['soundcloud', 'bandcamp', 'spotify', 'youtube']),
    url: z.string().url(),
    type: z.enum(['track', 'album', 'playlist', 'mix'])
  })).min(1),
  biography: z.string().min(100).max(1000),
  genres: z.array(z.enum([
    'techno', 'house', 'minimal', 'acid', 'industrial', 
    'ambient', 'dub_techno', 'detroit_techno', 'chicago_house',
    'deep_house', 'tech_house', 'progressive', 'electro', 
    'breakbeat', 'hardcore', 'gabber', 'experimental'
  ])).min(1).max(5),
  location: z.string().min(2).max(100).optional(),
  yearsActive: z.number().min(0).max(50).optional(),
  labels: z.array(z.string()).max(10).optional(),
  achievements: z.string().max(500).optional()
});

export const artistVerificationReviewSchema = z.object({
  status: z.enum(['verified', 'rejected', 'needs_info']),
  notes: z.string().max(500).optional(),
  rejectionReason: z.string().min(10).max(500).optional()
});

/**
 * Enhanced session and security schemas  
 */
export const sessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  isActive: z.boolean().default(true),
  lastAccessedAt: z.date().optional(),
  deviceFingerprint: z.string().optional()
});

export const securityEventSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  eventType: z.enum([
    'login_success',
    'login_failure',
    'logout',
    'password_change',
    'email_change',
    'credential_added',
    'credential_removed',
    'account_locked',
    'account_unlocked',
    'suspicious_activity',
    'data_export',
    'account_deletion',
    'verification_submitted',
    'verification_approved',
    'verification_rejected',
    'moderation_action',
    'admin_access'
  ]),
  severity: z.enum(['info', 'warning', 'error', 'critical']),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  createdAt: z.date(),
});

export const rateLimitSchema = z.object({
  id: z.string(),
  resource: z.string(),
  identifier: z.string(),
  count: z.number(),
  windowStart: z.date(),
  windowEnd: z.date(),
  isBlocked: z.boolean().default(false)
});

/**
 * Content moderation schemas
 */
export const moderationConfigSchema = z.object({
  toxicityThreshold: z.number().min(0).max(1).default(0.7),
  spamThreshold: z.number().min(0).max(1).default(0.8),
  nsfwThreshold: z.number().min(0).max(1).default(0.6),
  autoFlagEnabled: z.boolean().default(true),
  autoHideEnabled: z.boolean().default(false),
  requireManualReview: z.boolean().default(true)
});

export const moderationActionSchema = z.object({
  action: z.enum(['approve', 'reject', 'flag', 'hide', 'ban_user', 'warn_user']),
  reason: z.string().min(10).max(500),
  duration: z.number().optional(), // in hours
  notes: z.string().max(1000).optional()
});

// Type exports
export type WebAuthnCredentialCreationOptions = z.infer<typeof webAuthnCredentialCreationOptionsSchema>;
export type WebAuthnCredentialRequestOptions = z.infer<typeof webAuthnCredentialRequestOptionsSchema>;
export type WebAuthnCredential = z.infer<typeof webAuthnCredentialSchema>;
export type ArtistVerificationSubmission = z.infer<typeof artistVerificationSubmissionSchema>;
export type ArtistVerificationReview = z.infer<typeof artistVerificationReviewSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type SecurityEvent = z.infer<typeof securityEventSchema>;
export type RateLimit = z.infer<typeof rateLimitSchema>;
export type ModerationConfig = z.infer<typeof moderationConfigSchema>;
export type ModerationAction = z.infer<typeof moderationActionSchema>;
