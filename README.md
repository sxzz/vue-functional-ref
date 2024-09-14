# vue-functional-ref [![npm](https://img.shields.io/npm/v/vue-functional-ref.svg)](https://npmjs.com/package/vue-functional-ref)

[![Unit Test](https://github.com/sxzz/vue-functional-ref/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/vue-functional-ref/actions/workflows/unit-test.yml)

Functional-style refs for Vue. Inspired by [@antfu](https://github.com/antfu).

Requires Vue 3.5+

## Features

- ✨ Extend refs with functional style.
- 💖 Compatible with existing libraries. Tested on [Element Plus](https://github.com/element-plus/element-plus) and [VueUse](https://github.com/vueuse/vueuse).
- 🦾 Full TypeScript support.
- ⚡️ Supports Vite, Rollup, esbuild.

## Install

### PNPM / Yarn (Recommended)

If you're using pnpm or Yarn, try this approach first!

```bash
pnpm i vue-functional-ref
```

```jsonc
// package.json
{
  // ...
  "resolutions": {
    "@vue/runtime-core>@vue/reactivity": "npm:vue-functional-ref",
  },
}
```

### Bundler

If you're not using pnpm but using Rollup, Vite or esbuild, try this approach.

```bash
npm i vue-functional-ref
```

Supports Vite, Rollup and esbuild.

```ts
import VueFunctionalRef from 'vue-functional-ref/vite'
//                   Rollup: 'vue-functional-ref/rollup'
//                  esbuild: 'vue-functional-ref/esbuild'

export default {
  plugins: [VueFunctionalRef()],
}
```

#### TypeScript Support

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "paths": {
      "@vue/reactivity": ["./node_modules/vue-functional-ref/types"],
    },
  },
}
```

## Usage

### Ref

```ts
import { ref } from 'vue'

const count = ref(1)
count.set(10)
console.log(count())

// Mutate value inside of object
const obj = ref({ count: 1 })
obj.mutate((obj) => obj.count++)
```

### Computed

```ts
import { computed, ref } from 'vue'

const count = ref(1)
const double = computed(() => count() * 2)

console.log(double() === 2) // true
console.log(double.set === undefined) // true
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022-PRESENT [三咲智子](https://github.com/sxzz)
