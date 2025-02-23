import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
