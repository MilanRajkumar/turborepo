import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const { fileURLToPath } = require('url');
const path = require('path');
const { resolve: pathResolve } = require('path');

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);
console.log('root is:', root);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': pathResolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: pathResolve(root, 'src/components/index.ts'),
      name: 'ui',
      fileName: (format) => `ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
