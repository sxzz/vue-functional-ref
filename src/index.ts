import { computed as vueComputed, ref as vueRef } from 'vue'
import type {
  ComputedGetter,
  DebuggerOptions,
  ReactiveEffect,
  Ref,
  UnwrapRef,
  WritableComputedOptions,
} from 'vue'

function toFunctional<T>(
  raw: Ref<any>,
  readonly: boolean,
  keys: string[] = []
): T {
  const fn: FunctionalRef<any> = () => raw.value
  if (!readonly)
    fn.set = (value) => {
      raw.value = value
    }
  for (const key of keys) {
    ;(fn as any)[key] = (raw as any)[key]
  }
  return fn as any
}

export type ReadonlyFunctionalRef<T> = () => UnwrapRef<T>
export type WriteableFunctionalRef<T> = {
  set: (value: UnwrapRef<T>) => void
}
export type FunctionalRef<T> = ReadonlyFunctionalRef<T> &
  WriteableFunctionalRef<T>

export function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : FunctionalRef<UnwrapRef<T>>
export function ref<T = any>(value: T): FunctionalRef<T>
export function ref<T = any>(): FunctionalRef<T | undefined>
export function ref<T>(value?: T): any {
  return toFunctional(vueRef(value), false)
}

export interface FunctionalComputedRef<T> extends ReadonlyFunctionalRef<T> {
  readonly effect: ReactiveEffect<T>
}

export type WritableFunctionalComputedRef<T> = FunctionalComputedRef<T> &
  WriteableFunctionalRef<T>

export function computed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): FunctionalComputedRef<T>
export function computed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): WritableFunctionalComputedRef<T>
export function computed<T>(
  getter: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): any {
  const raw = vueComputed(getter as any, debugOptions)
  const fn: FunctionalComputedRef<T> = toFunctional(
    raw,
    typeof getter === 'function',
    ['effect']
  )
  return fn
}
