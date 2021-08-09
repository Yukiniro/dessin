const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require('rollup-plugin-uglify');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

console.log(nodeResolve);

module.exports = {
  input: resolve('src/index.js'),
  output: {
    file: resolve('dist/index.prod.js'),
    format: 'umd',
    name: 'zCanvas',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
    }),
    uglify(),
  ],
};
