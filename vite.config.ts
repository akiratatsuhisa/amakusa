import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: { disableDevLogs: true },
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Amakusa Application',
        short_name: 'Amakusa',
        description: 'Amakusa',
        theme_color: '#000000',
        background_color: '#FFFFFF',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {},
});
