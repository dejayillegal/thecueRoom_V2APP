import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans', className: '' }),
  Source_Code_Pro: () => ({ variable: '--font-mono', className: '' })
}));

import RootLayout from '../app/layout';
import Logo from '../components/Logo';

describe('smoke test', () => {
  it('renders Logo inside RootLayout without crashing', () => {
    const { container } = render(
      RootLayout({ children: <Logo data-testid="logo" /> })
    );
    expect(container.querySelector('[data-testid="logo"]')).toBeTruthy();
  });
});

