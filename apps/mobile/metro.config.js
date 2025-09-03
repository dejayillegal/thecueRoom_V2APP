const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.disableHierarchicalLookup = true;
config.resolver.extraNodeModules = new Proxy({}, {
  get(_, name) {
    if (['fs', 'path', 'http', 'https'].includes(name)) {
      throw new Error(`FORBIDDEN import of ${name}`);
    }
    return require('node-libs-react-native')[name] || name;
  }
});

module.exports = config;
