const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const fileSize = require('rollup-plugin-filesize');
const typescript = require('rollup-plugin-typescript2');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = {
  input: resolve('src/index.ts'),
  output: [
    {
      file: resolve('dist/dessin.mjs'),
      format: 'esm',
    },
    {
      file: resolve('dist/dessin.cjs'),
      format: 'cjs',
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
    }),
    fileSize(),
  ],
};
