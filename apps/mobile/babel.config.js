module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // any other plugins first …
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
