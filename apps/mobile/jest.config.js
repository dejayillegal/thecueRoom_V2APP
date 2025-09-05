module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-.*|@react-navigation|expo(nent)?|@expo(nent)?/.*|expo-modules-core|expo-image-picker|expo-image|expo-notifications|react-native-svg)/)'
  ],
};
