import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const __dirname = resolve(import.meta.url);

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/setup.js'],
    include: ['src/**/*.test.js'],
    watch: false, // Disable watch mode
    clearMocks: true, // Clear mocks before each test
    restoreMocks: true, // Restore mocks after each test
    mockReset: true, // Reset mock state before each test
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js'],
      exclude: [
        'node_modules/',
        'test/',
        'dist/',
        '**/*.config.js',
        '**/*.config.mjs',
        '**/*.test.js',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
