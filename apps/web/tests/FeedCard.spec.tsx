import { render } from '@testing-library/react';
import FeedCard, { FeedItem } from '../components/feed/FeedCard';
import { vi } from 'vitest';

vi.mock('../lib/supabase-browser', () => ({
  getBrowserClient: () => ({
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    from: () => ({ insert: vi.fn() }),
  }),
}));

test('renders feed item title', () => {
  const item: FeedItem = {
    id: '1',
    title: 'Hello',
    body: 'world',
    likes: 0,
    comments: [],
    created_at: '2024-01-01',
  };
  const { getByText } = render(<FeedCard item={item} />);
  expect(getByText('Hello')).toBeTruthy();
});
