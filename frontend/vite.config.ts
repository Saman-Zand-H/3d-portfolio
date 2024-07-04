import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  assetsInclude: ['**/*.glb'],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  preview: {
    port: 3000,
  },
  envDir: '../',
});
