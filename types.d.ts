/* eslint-disable @typescript-eslint/method-signature-style */

export type * from '@vue/reactivity/dist/reactivity'

declare module '@vue/reactivity/dist/reactivity' {
  export interface Ref<T = any, S = T> {
    (): T
    set(value: T): void
    mutate(mutator: (value: T) => void): void
  }

  export interface ComputedRef<T = any> extends BaseComputedRef<T> {
    set: never
  }

  export function readonly<T extends object>(
    target: T,
  ): DeepReadonlyFunctionalRef<UnwrapNestedRefs<T>>

  export type ReadonlyRef<T> = Omit<T, 'set' | 'mutate'>
  export type DeepReadonlyFunctionalRef<T> =
    T extends Ref<any> ? ReadonlyRef<DeepReadonly<T>> : DeepReadonly<T>
}
