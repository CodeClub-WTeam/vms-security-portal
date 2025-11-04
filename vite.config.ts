// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
   base: '/vms-security-portal/',
  resolve: {
    alias: {
      // Maps '@/' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});