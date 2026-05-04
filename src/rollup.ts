import { IMPORTER_RE, slash } from './common'
import type { Plugin } from 'rollup'

const rollup = (): Plugin => ({
  name: 'vue-functional-ref',
  resolveId: {
    filter: {
      id: /^@vue\/reactivity$/,
    },
    handler(id, importer) {
      if (importer) {
        const normalizedImporter = slash(importer)
        if (IMPORTER_RE.test(normalizedImporter)) return
      }
      return this.resolve('vue-functional-ref')
    },
  },
})
export default rollup
