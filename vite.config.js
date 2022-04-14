import {defineConfig, loadEnv} from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import path from 'path';
const fs = require('fs');

/**
 * https://vitejs.dev/config
 */
export default defineConfig(({ command, mode }) => {
  // Handle our env file need be.
  const envFile = '.env';
  if (fs.existsSync(path.join(__dirname, envFile))) {
    require('dotenv').config({ path:  envFile });
  }
  
  return {
    root: path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
      port: 8080,
    },
    open: false,
    build: {
      outDir: path.join(__dirname, 'build', 'renderer'),
      emptyOutDir: true,
    },
    plugins: [
      vuePlugin(),
    ],
    resolve: {
      alias:
        {
          '@': path.join(__dirname, 'src', 'renderer'),
          '~': path.join(__dirname, 'node_modules'),
        },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/public/styles/index.scss";`,
        },
      },
    },
  }
});
