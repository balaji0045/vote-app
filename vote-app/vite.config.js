import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow external access in production
    port: 5173,
  },
  build: {
    outDir: 'dist', // Ensure the output folder is correct
    sourcemap: true, // Helps debugging in production
  },
})
