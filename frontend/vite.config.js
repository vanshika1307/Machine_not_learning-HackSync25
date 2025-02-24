import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime',
            {
              regenerator: true,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/generate_images': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/donate/images': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
