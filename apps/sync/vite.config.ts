import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const port = 5173

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../dist/renderer',
  },
  plugins: [react()],
  root: './web',
  server: {
    port,
  },
})
