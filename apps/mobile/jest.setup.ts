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
  ScreenStack: (p: { children?: React.ReactNode }) => p?.children ?? null,
  ScreenStackHeaderConfig: (p: { children?: React.ReactNode }) => p?.children ?? null,
  ScreenStackHeaderSubview: (p: { children?: React.ReactNode }) => p?.children ?? null,
}));

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  const SafeAreaInsetsContext = React.createContext({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const SafeAreaProvider = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(
      SafeAreaInsetsContext.Provider,
      { value: { top: 0, bottom: 0, left: 0, right: 0 } },
      children
    );
  return {
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
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

// --- expo-image mock (ESM-only real module -> map to RN Image) ---
jest.mock('expo-image', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Image } = require('react-native');
  const Img = React.forwardRef((props: any, ref) => React.createElement(Image, { ref, ...props }));
  (Img as any).displayName = 'ExpoImageMock';
  return { Image: Img, default: Img };
});

// Optional: some codebases import blurhash from expo-image subpath
jest.mock(
  'expo-image/blurhash',
  () => ({
    Blurhash: () => null,
  }),
  { virtual: true }
);

// --- expo-notifications mock (avoid native init in tests) ---
jest.mock(
  'expo-notifications',
  () => {
    return {
      __esModule: true,
      default: {},
      addNotificationReceivedListener: jest.fn(),
      addNotificationResponseReceivedListener: jest.fn(),
      removeNotificationSubscription: jest.fn(),
      getPermissionsAsync: jest.fn(async () => ({ status: 'granted', granted: true })),
      requestPermissionsAsync: jest.fn(async () => ({ status: 'granted', granted: true })),
      scheduleNotificationAsync: jest.fn(async () => ({})),
      cancelAllScheduledNotificationsAsync: jest.fn(async () => {}),
      setNotificationHandler: jest.fn(),
    };
  },
  { virtual: true }
);
