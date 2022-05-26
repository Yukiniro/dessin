import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Windicss from 'vite-plugin-windicss';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
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
