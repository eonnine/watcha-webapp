const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra')
const { override, addWebpackAlias, disableChunk } = require('customize-cra');

module.export = override(
  disableChunk(),
  rewireReactHotLoader(),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
  })
);  