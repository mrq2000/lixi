import { ViteEjsPlugin } from 'vite-plugin-ejs';
import react from '@vitejs/plugin-react';

export default {
  server: {
    host: 'localhost',
    port: 3000,
    allowedHosts: [
      '5e0bd752b4e9.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
    ],
  },
  plugins: [react(), ViteEjsPlugin()],
  build: {
    sourcemap: false,
  },
};
