const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const server = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const fileSize = require('rollup-plugin-filesize');
const typescript = require('rollup-plugin-typescript2');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = {
  input: resolve('src/index.ts'),
  output: [
    {
      file: resolve('dist/dessin.js'),
      format: 'esm',
    },
    {
      file: resolve('dist/dessin.esm.js'),
      format: 'esm',
    },
    {
      file: resolve('dist/dessin.umd.js'),
      format: 'umd',
      name: 'Dessin',
    },
    {
      file: resolve('dist/dessin.cjs.js'),
      format: 'cjs',
    }
  ],
  plugins: [
    livereload(),
    server({
      open: false,
      host: 'localhost',
      port: 8080,
      contentBase: [''],
      openPage: '/demo/index.html'
    }),
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
      ],
    }),
    fileSize(),
  ],
  watch: {
    include: 'src/**/*.ts',
    clearScreen: false,
  }
};
