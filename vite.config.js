import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import Path from 'path';
import ViteFonts from 'vite-plugin-fonts';

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
        ViteFonts({
            google: {
                families: [
                    {
                        name: 'Lexend',
                        styles: 'wght@400;700;800',
                        defer: false
                    }
                ]
            },
        })
    ],
    resolve: {
        alias: {
            '@': Path.join(__dirname, 'src', 'renderer')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/public/styles/index.scss";`
            }
        }
    },
});

module.exports = config;