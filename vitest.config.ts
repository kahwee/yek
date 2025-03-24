import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environmentOptions: {
      browser: {
        enabled: false
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html']
    }
  }
})