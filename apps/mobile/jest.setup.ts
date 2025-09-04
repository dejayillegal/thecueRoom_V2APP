import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { NativeModules } from 'react-native';

NativeModules.PlatformConstants = NativeModules.PlatformConstants || { forceTouchAvailable: false };

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-screens');
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
