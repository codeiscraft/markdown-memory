import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const port = 6173

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    port,
  },
})
