const path = require('path');
const {
  override,
  disableChunk,
  addWebpackModuleRule,
  addWebpackAlias
} = require('customize-cra');

module.export = override(
  disableChunk(),
  addWebpackModuleRule({
    test: '/.(graphql|gql)$/',
    exclude: '/node_modules/',
    use: 'graphql-tag/loader',
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);  
