const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const fileSize = require('rollup-plugin-filesize');
const typescript = require('rollup-plugin-typescript2');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = {
  input: resolve('src/index.ts'),
  output: [
    {
      file: resolve('build/dessin.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve('build/dessin.esm.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve('build/dessin.umd.js'),
      format: 'umd',
      name: 'Dessin',
      sourcemap: true,
    },
    {
      file: resolve('build/dessin.cjs.js'),
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [
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
    uglify(),
    fileSize(),
  ],
};
