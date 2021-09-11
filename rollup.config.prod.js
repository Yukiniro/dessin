const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const fileSize = require('rollup-plugin-filesize');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

console.log(nodeResolve);

module.exports = {
  input: resolve('src/index.js'),
  output: [
    {
      file: resolve('dist/dessin.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve('dist/dessin.esm.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve('dist/index.umd.js'),
      format: 'umd',
      name: 'Dessin',
      sourcemap: true,
    },
    {
      file: resolve('dist/index.cjs.js'),
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      presets: ['@babel/preset-env'],
    }),
    uglify(),
    fileSize(),
  ],
};
