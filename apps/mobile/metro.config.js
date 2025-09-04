/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config');

/**
 * Expo-first Metro config with:
 *  - Node core module guard (prevents bundling http/fs/path/etc. into RN)
 *  - disableHierarchicalLookup hardening
 *  - Optional react-native-svg-transformer (if installed)
 */
const config = getDefaultConfig(__dirname);

config.resolver.disableHierarchicalLookup = true;

// --- Guard: forbid Node core modules in app code
const FORBIDDEN = new Set([
  'http',
  'https',
  'url',
  'fs',
  'path',
  'zlib',
  'stream',
  'crypto',
  'util',
  'net',
  'tls',
  'events'
]);
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = function (context, moduleName, platform) {
  if (FORBIDDEN.has(moduleName)) {
    throw new Error(
      `[mobile] Node builtin "${moduleName}" imported — not supported in React Native/Hermes.`
    );
  }
  if (typeof originalResolveRequest === 'function') {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(moduleName, platform);
};

// Optional react-native-svg-transformer
try {
  const svgTransformer = require.resolve('react-native-svg-transformer');
  config.transformer.babelTransformerPath = svgTransformer;
  const { assetExts, sourceExts } = config.resolver;
  config.resolver.assetExts = assetExts.filter((ext) => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];
} catch {
  // transformer not installed; ignore
}

module.exports = config;
