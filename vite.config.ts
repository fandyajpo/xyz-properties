import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

// visualizer({
//     open: true,
//     gzipSize: true,
//     brotliSize: true,
//   })