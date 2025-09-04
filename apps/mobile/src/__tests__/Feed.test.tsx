import { render, waitFor, cleanup } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Feed from '../screens/Feed';
import { supabase } from '../lib/supabase';

jest.mock('../lib/supabase');

const mockRange = jest.fn().mockResolvedValue({ data: [{ id: '1', content: 'Hello' }] });
const mockOrder = jest.fn(() => ({ range: mockRange }));
const mockSelect = jest.fn(() => ({ order: mockOrder }));
const supabaseMock = supabase as unknown as { from: jest.Mock };
supabaseMock.from = jest.fn(() => ({ select: mockSelect }));

describe('Feed', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
    cleanup();
  });

  it.skip('renders posts', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByText('Hello')).toBeTruthy();
    });
  });
});
