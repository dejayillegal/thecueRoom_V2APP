import 'react-native-gesture-handler/jestSetup';
import { NativeModules as _NM } from 'react-native';
import type React from 'react';

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'anon';

jest.mock(
  'expo-secure-store',
  () => ({
    getItemAsync: jest.fn().mockResolvedValue(null),
    setItemAsync: jest.fn().mockResolvedValue(undefined),
    deleteItemAsync: jest.fn().mockResolvedValue(undefined),
  }),
  { virtual: true }
);

jest.mock('./src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
      signInWithOAuth: jest.fn(),
      mfa: { enroll: jest.fn(), verify: jest.fn() },
      getUser: jest.fn(),
      setSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null }),
  },
}));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  Screen: (p: { children?: React.ReactNode }) => p?.children ?? null,
  ScreenContainer: (p: { children?: React.ReactNode }) => p?.children ?? null,
}));

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children?: React.ReactNode }) =>
      React.createElement('SafeAreaProvider', null, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// PlatformConstants to satisfy RN internals
interface RNPlatformConstants {
  forceTouchAvailable: boolean;
}
(_NM as { PlatformConstants?: RNPlatformConstants }).PlatformConstants =
  (_NM as { PlatformConstants?: RNPlatformConstants }).PlatformConstants || {
    forceTouchAvailable: false,
  };

// Silence NativeAnimatedHelper warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});
