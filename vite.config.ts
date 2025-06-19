import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      external: ['@recurly/recurly-js'],
      output: {
        globals: {
          '@recurly/recurly-js': 'recurly'
        }
      }

    }
  },
  base: "/apple-pay-demo/"
})
