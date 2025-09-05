import { render, fireEvent } from '@testing-library/react';
import ReactionBar from '../components/feed/ReactionBar';
import { vi } from 'vitest';

const insert = vi.fn();
vi.mock('../lib/supabase-browser', () => ({
  getBrowserClient: () => ({
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    from: () => ({ insert }),
    removeChannel: () => {},
  }),
}));

test('increments likes on click', () => {
  const { getByRole } = render(<ReactionBar postId="1" initialLikes={0} />);
  const btn = getByRole('button');
  fireEvent.click(btn);
  expect(btn.textContent).toContain('1');
  expect(insert).toHaveBeenCalled();
});
