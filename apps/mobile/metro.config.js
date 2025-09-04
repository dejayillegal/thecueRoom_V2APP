/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.disableHierarchicalLookup = true;
const forbidden = ['http','https','url','fs','path','zlib','stream','crypto','util','net','tls','events'];
config.resolver.extraNodeModules = new Proxy({}, {
  get(_target, name) {
    if (forbidden.includes(name)) {
      throw new Error(`FORBIDDEN import of ${String(name)}`);
    }
    return require('node-libs-react-native')[name] || name;
  }
});

module.exports = config;
