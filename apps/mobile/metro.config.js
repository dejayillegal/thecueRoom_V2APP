/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config');

// Start with Expo default (Doctor requires this)
const config = getDefaultConfig(__dirname);

// Node builtins hard guard (kept)
const FORBIDDEN = new Set([
  'http','https','url','fs','path','zlib','stream','crypto','util','net','tls','events'
]);
const origResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (ctx, name, platform) => {
  if (FORBIDDEN.has(name)) {
    throw new Error(`[mobile] Node builtin "${name}" imported – not supported in React Native/Hermes.`);
  }
  if (origResolveRequest) return origResolveRequest(ctx, name, platform);
  return require('metro-resolver').resolve(ctx, name, platform);
};
config.resolver.disableHierarchicalLookup = true;

// Optional: react-native-svg-transformer if installed
try {
  const tr = require.resolve('react-native-svg-transformer');
  config.transformer.babelTransformerPath = tr;
  config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
  if (!config.resolver.sourceExts.includes('svg')) config.resolver.sourceExts.push('svg');
} catch { /* ok if not installed */ }

module.exports = config;
