const path = require('path');
const ZipPlugin = require('../../src/plugins/zip-plugin/index').default;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.bundle.js',
  },
  plugins: [
    new ZipPlugin({
      filename: 'offline'
    })
  ],
};