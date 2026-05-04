import { lib } from 'tsdown-preset-sxzz'

export default lib(
  {
    entry: ['./src/*.ts', '!./src/common.ts'],
  },
  {
    deps: {
      neverBundle: ['@vue/reactivity', 'vite', 'esbuild', 'rollup'],
    },
  },
)
