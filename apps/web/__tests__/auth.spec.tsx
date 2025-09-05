import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect } from 'vitest';
import AuthForm from '../components/auth/AuthForm';

vi.mock('../lib/supabase-browser', () => ({
  getBrowserClient: () => ({
    auth: {
      signInWithOtp: vi.fn().mockResolvedValue({ error: null }),
      signInWithOAuth: vi.fn(),
      mfa: { enroll: vi.fn(), verify: vi.fn() },
      getUser: vi.fn().mockResolvedValue({ data: { user: null } })
    }
  })
}));

describe('AuthForm', () => {
  it('renders email input', () => {
    render(<AuthForm />);
    expect(screen.getByPlaceholderText(/example/i)).toBeInTheDocument();
  });
});
