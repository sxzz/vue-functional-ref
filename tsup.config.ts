import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/common.ts'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  splitting: true,
  cjsInterop: true,
  clean: true,
  dts: {
    compilerOptions: {
      paths: {},
    },
  },
  external: ['@vue/reactivity', '@vue/shared'],
})
