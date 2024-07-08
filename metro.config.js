// Learn more https://docs.expo.io/guides/customizing-metro\
const dotenv = require('dotenv');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const moduleResolver = require('./src/lib/moduleResolver');

dotenv.config({ path: ['.env.local', '.env'] });

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift('sbmodern');

/**
 * Entrypoint Resolution
 */
defaultConfig.resolver.resolveRequest = moduleResolver;

module.exports = withNativeWind(defaultConfig, { input: './theme/tailwind.css' });
