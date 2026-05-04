import { normalizePath } from 'unplugin-utils'
import { IMPORTER_RE } from './common'
import type { Plugin } from 'rollup'

const rollup = (): Plugin => ({
  name: 'vue-functional-ref',
  resolveId: {
    filter: {
      id: /@vue\/reactivity/,
    },
    handler(id, importer) {
      if (importer) {
        const normalizedImporter = normalizePath(importer)
        if (IMPORTER_RE.test(normalizedImporter)) return
      }
      return this.resolve('vue-functional-ref')
    },
  },
})
export default rollup
