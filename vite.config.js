import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';


export default defineConfig(() => {
  return {
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
        },
    },
    build: {
      outDir: 'build',
    },
    loader: { '.js': 'jsx' },
    plugins: [
        react(),
        svgr({ svgrOptions: { icon: true } }) // svgr options: https://react-svgr.com/docs/options/
    ],
  };
});