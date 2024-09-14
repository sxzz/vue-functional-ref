import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueFunctionalRef from 'vue-functional-ref/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueFunctionalRef(), vue()],
})
