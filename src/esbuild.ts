import { normalizePath } from 'unplugin-utils'
import { IMPORTER_RE } from './common'
import type { Plugin } from 'esbuild'

export default (): Plugin => ({
  name: 'vue-functional-ref',
  setup(build) {
    build.onResolve(
      { filter: /^@vue\/reactivity$/, namespace: 'file' },
      ({ importer, kind }) => {
        const normalizedImporter = normalizePath(importer)
        if (IMPORTER_RE.test(normalizedImporter)) return

        return build.resolve('vue-functional-ref', {
          kind,
        })
      },
    )
  },
})
