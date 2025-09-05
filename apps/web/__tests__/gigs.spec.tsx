import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import GigRadarPage from '../app/(gigs)/gig-radar/page';

test('filters gigs by genre', () => {
  render(<GigRadarPage />);
  expect(screen.getByText('Indie Night')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rock' } });
  expect(screen.queryByText('Indie Night')).toBeNull();
});
