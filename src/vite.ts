import rolldownPlugin from './rolldown'
import type { Plugin } from 'vite'

const vite = (): Plugin => ({
  ...(rolldownPlugin() as any),
  enforce: 'pre',
  config() {
    return {
      optimizeDeps: {
        rolldownOptions: {
          plugins: [rolldownPlugin()],
        },
      },
    }
  },
})
export default vite
