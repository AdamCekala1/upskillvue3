import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage:{
      reporter:['text', 'json', 'html'],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
