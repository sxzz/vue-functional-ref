import { computed as vueComputed, ref as vueRef } from 'vue'
import type {
  ComputedGetter,
  DebuggerOptions,
  Ref,
  UnwrapRef,
  WritableComputedOptions,
} from 'vue'

export type ReadonlyFunctionalRef<T> = () => UnwrapRef<T>
export type WriteableFunctionalRef<T> = (value: UnwrapRef<T>) => void
export type FunctionalRef<T> = ReadonlyFunctionalRef<T> &
  WriteableFunctionalRef<T>

export function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : FunctionalRef<UnwrapRef<T>>
export function ref<T = any>(value: T): FunctionalRef<T>
export function ref<T = any>(): FunctionalRef<T | undefined>
export function ref<T>(value?: T): any {
  const r = vueRef(value)

  return (...args: [value: UnwrapRef<T>] | []) => {
    if (args.length === 1) r.value = args[0]
    else return r.value
  }
}

export function computed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): ReadonlyFunctionalRef<T>

export function computed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): FunctionalRef<T>
export function computed<T>(
  getter: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): any {
  return ref(vueComputed(getter as any, debugOptions))
}
