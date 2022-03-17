import {defineConfig} from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import Path from 'path';

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, 'src', 'renderer'),
  publicDir: 'public',
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true,
  },
  plugins: [
    vuePlugin(),
  ],
  resolve: {
    alias:
      {
        '@': Path.join(__dirname, 'src', 'renderer'),
        '~': Path.join(__dirname, 'node_modules'),
      },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/public/styles/index.scss";`,
      },
    },
  },
});

module.exports = config;
