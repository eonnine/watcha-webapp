const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra')
const {
  override,
  disableChunk,
  addWebpackModuleRule
} = require('customize-cra');

module.export = override(
  disableChunk(),
  rewireReactHotLoader(),
  addWebpackModuleRule({
    test: '/\.(graphql|gql)$/',
    exclude: '/node_modules/',
    use: 'graphql-tag/loader',
  }),
);  