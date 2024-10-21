// vite.config.js
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  test: {
    globals: true, // Enables global test variables like `describe`, `it`, and `expect`
    environment: 'jsdom', // Allows DOM API testing
    setupFiles: './src/setupTests.js', // Optional: path for setup file
  },
  server: {
    open: true, // This will open the browser automatically
  },
  plugins: [eslintPlugin()],
});
