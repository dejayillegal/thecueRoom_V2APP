import { z } from 'zod';

/**
 * Moderation action types
 */
export const moderationActionSchema = z.enum([
  'approve',
  'reject',
  'flag',
  'remove',
  'warn',
  'suspend',
  'ban'
]);
export type ModerationAction = z.infer<typeof moderationActionSchema>;

/**
 * Content flags for moderation
 */
export const contentFlagSchema = z.enum([
  'spam',
  'harassment',
  'hate_speech',
  'violence',
  'nsfw',
  'misinformation',
  'self_promotion',
  'off_topic',
  'copyright_violation'
]);
export type ContentFlag = z.infer<typeof contentFlagSchema>;

/**
 * Moderation severity levels
 */
export const severityLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
export type SeverityLevel = z.infer<typeof severityLevelSchema>;

/**
 * AI moderation score schema
 */
export const moderationScoreSchema = z.object({
  toxicity: z.number().min(0).max(1),
  spam: z.number().min(0).max(1),
  nsfw: z.number().min(0).max(1),
  offtopic: z.number().min(0).max(1),
  overall: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
});

/**
 * Moderation thresholds for automatic actions
 */
export const moderationThresholds = {
  autoFlag: {
    toxicity: 0.7,
    spam: 0.8,
    nsfw: 0.6,
    overall: 0.65,
  },
  autoRemove: {
    toxicity: 0.9,
    spam: 0.95,
    nsfw: 0.85,
    overall: 0.9,
  },
} as const;

/**
 * Check if content should be auto-flagged
 */
export const shouldAutoFlag = (scores: z.infer<typeof moderationScoreSchema>): boolean => {
  return (
    scores.toxicity >= moderationThresholds.autoFlag.toxicity ||
    scores.spam >= moderationThresholds.autoFlag.spam ||
    scores.nsfw >= moderationThresholds.autoFlag.nsfw ||
    scores.overall >= moderationThresholds.autoFlag.overall
  );
};

/**
 * Check if content should be auto-removed
 */
export const shouldAutoRemove = (scores: z.infer<typeof moderationScoreSchema>): boolean => {
  return (
    scores.toxicity >= moderationThresholds.autoRemove.toxicity ||
    scores.spam >= moderationThresholds.autoRemove.spam ||
    scores.nsfw >= moderationThresholds.autoRemove.nsfw ||
    scores.overall >= moderationThresholds.autoRemove.overall
  );
};

/**
 * Determine severity level from moderation scores
 */
export const getSeverityLevel = (scores: z.infer<typeof moderationScoreSchema>): SeverityLevel => {
  if (shouldAutoRemove(scores)) return 'critical';
  if (shouldAutoFlag(scores)) return 'high';
  if (scores.overall > 0.4) return 'medium';
  return 'low';
};

/**
 * Community guidelines keywords for techno/house scene
 */
export const communityKeywords = {
  allowed: [
    'techno', 'house', 'electronic', 'underground', 'rave', 'club', 'dj', 'producer',
    'synth', 'beat', 'bass', 'melody', 'remix', 'mix', 'set', 'track', 'release',
    'label', 'vinyl', 'digital', 'studio', 'gear', 'software', 'hardware',
    'bangalore', 'club', 'venue', 'event', 'party', 'gig', 'performance'
  ],
  flagged: [
    'mainstream', 'commercial', 'pop', 'radio', 'chart', 'billboard',
    'self-promo', 'promotion', 'marketing', 'spam', 'follow me', 'check out'
  ],
  banned: [
    'hate', 'harassment', 'doxx', 'leak', 'pirate', 'illegal', 'drug deal',
    'scam', 'fraud', 'fake', 'bot', 'automated'
  ]
} as const;

/**
 * Check content against community guidelines
 */
export const checkCommunityGuidelines = (content: string): {
  isViolation: boolean;
  flags: ContentFlag[];
  severity: SeverityLevel;
  reason: string;
} => {
  const normalizedContent = content.toLowerCase();
  const flags: ContentFlag[] = [];
  let severity: SeverityLevel = 'low';
  let reason = '';

  // Check for banned content
  for (const keyword of communityKeywords.banned) {
    if (normalizedContent.includes(keyword)) {
      flags.push('harassment');
      severity = 'critical';
      reason = `Contains banned keyword: ${keyword}`;
      return { isViolation: true, flags, severity, reason };
    }
  }

  // Check for flagged content
  for (const keyword of communityKeywords.flagged) {
    if (normalizedContent.includes(keyword)) {
      flags.push('self_promotion');
      severity = 'medium';
      reason = `Contains flagged keyword: ${keyword}`;
    }
  }

  // Check for off-topic content (if no music-related keywords)
  const hasMusicKeywords = communityKeywords.allowed.some(keyword =>
    normalizedContent.includes(keyword)
  );

  if (!hasMusicKeywords && content.length > 50) {
    flags.push('off_topic');
    severity = 'low';
    reason = 'Content may be off-topic for electronic music community';
  }

  return {
    isViolation: flags.length > 0,
    flags,
    severity,
    reason
  };
};

/**
 * Format moderation report
 */
export const formatModerationReport = (
  contentId: string,
  scores: z.infer<typeof moderationScoreSchema>,
  guidelinesCheck: ReturnType<typeof checkCommunityGuidelines>
): string => {
  const severity = getSeverityLevel(scores);
  
  return `
Moderation Report for Content ID: ${contentId}

AI Scores:
- Toxicity: ${(scores.toxicity * 100).toFixed(1)}%
- Spam: ${(scores.spam * 100).toFixed(1)}%
- NSFW: ${(scores.nsfw * 100).toFixed(1)}%
- Off-topic: ${(scores.offtopic * 100).toFixed(1)}%
- Overall: ${(scores.overall * 100).toFixed(1)}%
- Confidence: ${(scores.confidence * 100).toFixed(1)}%

Community Guidelines:
- Violation: ${guidelinesCheck.isViolation ? 'Yes' : 'No'}
- Flags: ${guidelinesCheck.flags.join(', ') || 'None'}
- Reason: ${guidelinesCheck.reason || 'Clean content'}

Overall Severity: ${severity.toUpperCase()}

Recommended Actions:
${shouldAutoRemove(scores) ? '- AUTO-REMOVE content immediately' : ''}
${shouldAutoFlag(scores) ? '- FLAG for human review' : ''}
${severity === 'low' ? '- APPROVE with monitoring' : ''}
  `.trim();
};