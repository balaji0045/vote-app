import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensure correct routing
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
});
