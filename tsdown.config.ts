import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/common.ts'],
  format: ['cjs', 'esm'],
  target: 'node18.12',
  external: ['@vue/reactivity', '@vue/shared'],
  dts: true,
  clean: true,
})
