import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import { resolve } from 'path'

const esbuildPlugin = () => ({
  ...esbuild({
    target: 'chrome64',
    include: /\.vue$/,
    loaders: {
      '.vue': 'js',
    },
  }),
})

// https://vitejs.dev/config/
export default defineConfig({
  root: './example/',
  base: '',
  plugins: [vue(), esbuildPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
})

