import { normalizePath } from 'unplugin-utils'
import { IMPORTER_RE } from './common'
import type { Plugin } from 'rollup'

export default (): Plugin => ({
  name: 'vue-functional-ref',
  resolveId(id, importer) {
    if (id !== '@vue/reactivity') return
    if (importer) {
      const normalizedImporter = normalizePath(importer)
      if (IMPORTER_RE.test(normalizedImporter)) return
    }

    return this.resolve('vue-functional-ref')
  },
})
