import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Windicss from 'vite-plugin-windicss';
import svgr from '@honkhonk/vite-plugin-svgr';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      svgr(),
      Windicss({
        config: {
          attributify: true,
        },
      }),
    ],
    resolve: {
      alias: {
        dessin:
          mode === 'development'
            ? path.resolve(__dirname, '../src/index.ts')
            : path.resolve(__dirname, '../dist/dessin.mjs'),
      },
    },
  };
});
