import { z } from 'zod';

/**
 * WebAuthn credential schemas
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
 * Stored credential schema
 */
export const storedCredentialSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  credentialId: z.string(),
  publicKey: z.string(),
  counter: z.number(),
  transports: z.array(z.enum(['usb', 'nfc', 'ble', 'internal'])),
  deviceName: z.string().max(100).optional(),
  createdAt: z.date(),
  lastUsedAt: z.date().optional(),
  isActive: z.boolean().default(true),
});

/**
 * Session schema
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
});

/**
 * Permission schemas
 */
export const permissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  description: z.string().max(255).optional(),
  resource: z.string().max(100),
  action: z.string().max(100),
  conditions: z.record(z.unknown()).optional(),
});

export const rolePermissionSchema = z.object({
  roleId: z.string().uuid(),
  permissionId: z.string().uuid(),
});

/**
 * Security event schemas
 */
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
    'account_deletion'
  ]),
  severity: z.enum(['info', 'warning', 'error', 'critical']),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: z.date(),
});

/**
 * Rate limiting schemas
 */
export const rateLimitSchema = z.object({
  id: z.string(),
  resource: z.string(),
  identifier: z.string(), // IP, user ID, etc.
  count: z.number(),
  windowStart: z.date(),
  windowEnd: z.date(),
});

/**
 * Two-factor authentication schemas
 */
export const totpSetupSchema = z.object({
  secret: z.string(),
  qrCodeUrl: z.string(),
  backupCodes: z.array(z.string()),
});

export const totpVerificationSchema = z.object({
  token: z.string().length(6).regex(/^\d{6}$/),
  backupCode: z.string().optional(),
});

// Type exports
export type WebAuthnCredentialCreationOptions = z.infer<typeof webAuthnCredentialCreationOptionsSchema>;
export type WebAuthnCredentialRequestOptions = z.infer<typeof webAuthnCredentialRequestOptionsSchema>;
export type WebAuthnCredential = z.infer<typeof webAuthnCredentialSchema>;
export type StoredCredential = z.infer<typeof storedCredentialSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Permission = z.infer<typeof permissionSchema>;
export type RolePermission = z.infer<typeof rolePermissionSchema>;
export type SecurityEvent = z.infer<typeof securityEventSchema>;
export type RateLimit = z.infer<typeof rateLimitSchema>;
export type TotpSetup = z.infer<typeof totpSetupSchema>;
export type TotpVerification = z.infer<typeof totpVerificationSchema>;