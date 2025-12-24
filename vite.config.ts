import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';


export default defineConfig({
    plugins: [
        react(),
        svgr(),
        tsconfigPaths(),

        // sitemap({
        //     hostname: 'https://nexastay.ai',
        //     dynamicRoutes: [
        //         '/',
        //         '/hotels',
        //         '/profile',
        //         '/nexavoice',
        //         '/conversation',
        //         '/favorites'
        //     ]
        // }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build', // Maintain 'build' folder for compatibility with existing deploy scripts if any
    },
});
