// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Block linter and dev tooling packages from Metro resolver/file map
config.resolver.blockList = [
  /node_modules[/\\]eslint-config-expo[/\\].*/,
  /node_modules[/\\]@eslint[/\\].*/,
  /node_modules[/\\]eslint[/\\].*/,
];

module.exports = config;
