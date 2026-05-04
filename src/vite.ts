import esbuildPlugin from './esbuild'
import rollupPlugin from './rollup'
import type { Plugin } from 'vite'

const vite = (): Plugin => ({
  ...(rollupPlugin() as any),
  enforce: 'pre',
  config() {
    return {
      optimizeDeps: {
        esbuildOptions: {
          plugins: [esbuildPlugin()],
        },
      },
    }
  },
})
export default vite
