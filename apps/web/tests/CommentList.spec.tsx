import { render, fireEvent } from '@testing-library/react';
import CommentList from '../components/feed/CommentList';
import { vi } from 'vitest';

const insert = vi.fn();
vi.mock('../lib/supabase-browser', () => ({
  getBrowserClient: () => ({
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    from: () => ({ insert }),
    removeChannel: () => {},
  }),
}));

test('adds comment on submit', () => {
  const { getByPlaceholderText, getByText } = render(
    <CommentList postId="1" initialComments={[]} />
  );
  const input = getByPlaceholderText('Add comment');
  fireEvent.change(input, { target: { value: 'hi' } });
  fireEvent.click(getByText('Post'));
  expect(getByText('hi')).toBeTruthy();
  expect(insert).toHaveBeenCalled();
});
