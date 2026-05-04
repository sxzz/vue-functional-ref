import { IMPORTER_RE, slash } from './common'
import type { Plugin } from 'esbuild'

const esbuild = (): Plugin => ({
  name: 'vue-functional-ref',
  setup(build) {
    build.onResolve(
      { filter: /^@vue\/reactivity$/, namespace: 'file' },
      ({ importer, kind }) => {
        const normalizedImporter = slash(importer)
        if (IMPORTER_RE.test(normalizedImporter)) return

        return build.resolve('vue-functional-ref', {
          kind,
        })
      },
    )
  },
})
export default esbuild
