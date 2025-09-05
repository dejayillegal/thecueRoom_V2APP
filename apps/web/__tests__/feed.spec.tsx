import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect, test, vi, afterEach } from 'vitest';
import FeedCard, { FeedItem } from '../components/feed/FeedCard';

vi.mock('@/lib/supabase-browser', () => ({
  getBrowserClient: () => ({
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    removeChannel: () => {},
    from: () => ({ insert: () => ({ catch: () => {} }) })
  })
}));

afterEach(() => {
  cleanup();
});

test('reaction bar increments likes', () => {
  const item: FeedItem = {
    id: '1',
    title: 'Test',
    body: 'Body',
    likes: 0,
    comments: [],
    created_at: new Date().toISOString()
  };
  render(<FeedCard item={item} />);
  const btn = screen.getByRole('button', { name: /like/i });
  fireEvent.click(btn);
  expect(btn).toHaveTextContent('1');
});

test('comment list adds comment', () => {
  const item: FeedItem = {
    id: '1',
    title: 'Test',
    body: 'Body',
    likes: 0,
    comments: [],
    created_at: new Date().toISOString()
  };
  render(<FeedCard item={item} />);
  const input = screen.getByPlaceholderText(/add comment/i);
  fireEvent.change(input, { target: { value: 'hi' } });
  fireEvent.submit(input.closest('form')!);
  expect(screen.getByText('hi')).toBeInTheDocument();
});
