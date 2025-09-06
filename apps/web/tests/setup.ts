import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock next/font/google to return stable objects in JSDOM
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'font-inter', variable: '--font-inter' }),
  Source_Code_Pro: () => ({ className: 'font-source', variable: '--font-source' }),
}));

// Optional: mock supabase client features used in tests
vi.mock('@supabase/supabase-js', async () => {
  const real = await vi.importActual<any>('@supabase/supabase-js').catch(() => ({}));
  const makeChannel = () => ({
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
  });
  return {
    ...real,
    createClient: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      update: vi.fn().mockResolvedValue({ data: null, error: null }),
      channel: vi.fn(() => makeChannel()),
      removeChannel: vi.fn(),
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      },
    })),
  };
});
