const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const server = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const fileSize = require('rollup-plugin-filesize');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

console.log(nodeResolve);

module.exports = {
  input: resolve('src/index.js'),
  output: {
    file: resolve('dist/index.dev.js'),
    format: 'esm',
    name: 'zCanvas',
    sourcemap: true,
  },
  plugins: [
    livereload(),
    server({
      open: true,
      host: 'localhost',
      port: 3000,  
      contentBase: [''],
      openPage: '/demo/index.html'
    }),
    commonjs(),
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
    }),
    fileSize(),
  ],
};
