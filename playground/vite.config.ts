import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        dessin: mode === 'development' ? '../../src/index' : '../../dist/dessin.mjs',
      },
    },
  };
});
