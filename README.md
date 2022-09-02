# vue-functional-ref [![npm](https://img.shields.io/npm/v/vue-functional-ref.svg)](https://npmjs.com/package/vue-functional-ref)

[![Unit Test](https://github.com/sxzz/vue-functional-ref/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/vue-functional-ref/actions/workflows/unit-test.yml)

Functional-style refs for Vue. Inspired by [@antfu](https://github.com/antfu).

## Features

- ✨ Extend refs with functional style.
- 💖 Compatible with existing libraries. Tested on [Element Plus](https://github.com/element-plus/element-plus).
- 🦾 Full TypeScript support.
- ⚡️ Supports Vite, Rollup, esbuild.

## Install

```bash
npm i vue-functional-ref
```

### TypeScript Support

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@vue/reactivity": ["./node_modules/vue-functional-ref/types"]
    }
  }
}
```

## Usage

Support Vite, Rollup and esbuild

```ts
import VueFunctionalRef from 'vue-functional-ref/vite'
// 'vue-functional-ref/rollup' for Rollup
// 'vue-functional-ref/esbuild' for esbuild

export default {
  plugins: [VueFunctionalRef()],
}
```

### Ref

```vue
<script setup>
import { ref } from 'vue'
const count = ref(1)
count.set(10)

console.log(count())
</script>
```

### Computed

```vue
<script setup>
import { computed, ref } from 'vue'
const count = ref(1)
const double = computed(() => count() * 2)

console.log(double() === 2) // true
console.log(double.set === undefined) // true
</script>
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [三咲智子](https://github.com/sxzz)
