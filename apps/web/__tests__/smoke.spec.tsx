import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Page from '../app/page';

describe('landing page', () => {
  it('renders hero', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { name: /welcome to thecueroom/i })
    ).toBeInTheDocument();
  });
});
