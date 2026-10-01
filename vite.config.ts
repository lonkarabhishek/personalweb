import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // NOTE: the Gemini API key is intentionally NOT exposed to the client.
      // It is used only server-side by the /api/agent serverless function.
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            studio: path.resolve(__dirname, 'studio.html'),
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
