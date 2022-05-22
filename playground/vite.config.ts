import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Windicss from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), Windicss()],
    resolve: {
      alias: {
        dessin: mode === 'development' ? '../../src/index' : '../../dist/dessin.mjs',
      },
    },
  };
});
