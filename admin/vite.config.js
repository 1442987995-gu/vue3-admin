import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve:{
  //   alias:{
  //     "@":resolve(__dirname,'src')
  //   }
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://119.23.71.39:1289',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
    // proxy: {
    //   '/brand-api': {
    //     target: 'http://39.98.123.211:8510',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/brand-api/, '')
    //   }
    // }
 },
})
