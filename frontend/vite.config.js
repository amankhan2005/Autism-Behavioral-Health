import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Imports across src/ use relative paths (no "@/" alias), so none is configured.
//
// JSX uses the AUTOMATIC runtime, so components never reference the React
// namespace and don't need `import React`. Pinning it explicitly (plugin +
// esbuild) guarantees a "React is not defined" error can't arise from a
// classic-runtime fallback in any environment.
export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  esbuild: { jsx: 'automatic' },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
