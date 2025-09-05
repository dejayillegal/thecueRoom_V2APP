import { describe, it, expect } from 'vitest';
import { score } from '../lib/ranking';

describe('score', () => {
  it('ranks newer items higher', () => {
    const a = score({ likes: 0, comments: 0, created_at: new Date().toISOString() });
    const b = score({ likes: 0, comments: 0, created_at: '2000-01-01' });
    expect(a).toBeGreaterThan(b);
  });
});
