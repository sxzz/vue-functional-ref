declare module '@vue/reactivity' {
  export interface Ref<T> {
    (): T
    set: (value: T) => void
  }

  export interface ComputedRef {
    set: never
  }
}

export {}
