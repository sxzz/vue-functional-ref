import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'vue-alias',
      enforce: 'pre',
      resolveId(id, importer) {
        if (id !== '@vue/reactivity') return
        if (importer.includes('vue-functional-ref/dist/index.mjs')) return

        return this.resolve('vue-functional-ref')
      },
    },
    vue(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'vue-alias',
          setup(build) {
            build.onResolve(
              { filter: /^@vue\/reactivity$/, namespace: 'file' },
              ({ importer }) => {
                if (importer.includes('vue-functional-ref/dist/index.mjs'))
                  return
                return build.resolve('vue-functional-ref')
              }
            )
          },
        },
      ],
    },
  },
})
