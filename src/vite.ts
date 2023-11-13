import rollupPlugin from './rollup'
import esbuildPlugin from './esbuild'
import type { Plugin } from 'vite'

export default (): Plugin => ({
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
