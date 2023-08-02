import { type Plugin } from 'vite'
import rollupPlugin from './rollup'
import esbuildPlugin from './esbuild'

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
