const path = require('path');
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
  input: './index.js',
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'umd',
    name: 'zCanvas'
  },
  plugins: [
    commonjs(),
  ]
};