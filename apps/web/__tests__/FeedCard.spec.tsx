import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import FeedCard, { FeedItem } from '../components/FeedCard';

test('increments likes', () => {
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
