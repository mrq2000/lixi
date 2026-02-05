import { ViteEjsPlugin } from 'vite-plugin-ejs';
import react from '@vitejs/plugin-react';

export default {
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [react(), ViteEjsPlugin()],
  build: {
    sourcemap: false,
    outDir: 'dist',
  },
};
