import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Feed from '../src/screens/Feed';

jest.mock('../src/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          range: () => Promise.resolve({ data: [] })
        })
      })
    }),
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    removeChannel: () => {}
  }
}));

test('renders Feed screen', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Feed />
    </QueryClientProvider>
  );
});
