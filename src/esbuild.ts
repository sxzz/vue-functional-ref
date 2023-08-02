import { normalizePath } from '@rollup/pluginutils'
import { type Plugin } from 'esbuild'
import { IMPORTER_RE } from './common'

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
      }
    )
  },
})
