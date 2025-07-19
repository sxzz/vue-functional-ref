import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts', '!./src/common.ts'],
  external: ['@vue/reactivity', '@vue/shared'],
})
