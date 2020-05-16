const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra')
const {
  override,
  addWebpackAlias,
  disableChunk,
  addWebpackModuleRule
} = require('customize-cra');

module.export = override(
  disableChunk(),
  rewireReactHotLoader(),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
  }),
  addWebpackModuleRule({
    test: '/\.(graphql|gql)$/',
    exclude: '/node_modules/',
    use: 'graphql-tag/loader'
  })
);  