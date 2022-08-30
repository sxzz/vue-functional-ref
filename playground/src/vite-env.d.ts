/// <reference types="vite/client" />
/// <reference types="vue-functional-ref/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
