import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '../navigation/RootNavigator';

jest.mock('../lib/session', () => ({
  loadSession: async () => ({ user: { id: '1', app_metadata: {} } }),
  initSessionListener: jest.fn(),
}));

jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: { onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })) },
    channel: jest.fn(() => ({ on: jest.fn().mockReturnValue({ subscribe: jest.fn() }) })),
  }
}));

jest.mock('@expo-google-fonts/inter', () => ({ useFonts: () => [true] }));
jest.mock('@expo-google-fonts/source-code-pro', () => ({ useFonts: () => [true] }));

test('flow from feed to profile', async () => {
  const ref = createNavigationContainerRef();
  const qc = new QueryClient();
  render(
    <QueryClientProvider client={qc}>
      <NavigationContainer ref={ref}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
  await waitFor(() => expect(ref.getCurrentRoute()?.name).toBe('Feed'));
  ref.navigate('Profile');
  await waitFor(() => expect(ref.getCurrentRoute()?.name).toBe('Profile'));
});
