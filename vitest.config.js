import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,ts}'],
    exclude: ['tests/**/*.spec.{js,ts}'],
  },
});