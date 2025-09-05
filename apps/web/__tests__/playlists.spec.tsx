import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import PlaylistsPage from '../app/(music)/playlists/page';

test('renders playlists with Spotify links', async () => {
  render(await PlaylistsPage());
  expect(screen.getByText('Starter Mix')).toBeInTheDocument();
  const link = screen.getByRole('link', { name: 'Sample Song' });
  expect(link.getAttribute('href')).toContain('open.spotify.com/track');
});
