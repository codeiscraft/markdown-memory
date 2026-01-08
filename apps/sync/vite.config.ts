import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const port = 5173

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'dist',
  },
  plugins: [react()],
  root: '.',
  server: {
    port,
  },
})
