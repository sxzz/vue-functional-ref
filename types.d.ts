/* eslint-disable @typescript-eslint/no-empty-interface */

import type {
  ComputedGetter,
  DebuggerOptions,
  ReactiveEffect,
  RefUnwrapBailTypes,
  WritableComputedOptions,
} from '@vue/reactivity/dist/reactivity'
import type { IfAny } from '@vue/shared'

export {
  ReactiveFlags,
  DebuggerEventExtraInfo,
  DebuggerEvent,
  DebuggerOptions,
  RefUnwrapBailTypes,
  ComputedGetter,
  ComputedSetter,
  WritableComputedOptions,
  TriggerOpTypes,
  shallowReadonly,
  resetTracking,
  TrackOpTypes,
  EffectScheduler,
  ReactiveEffect,
  EffectScope,
  effectScope,
  enableTracking,
  getCurrentScope,
  isProxy,
  isReactive,
  isReadonly,
  isShallow,
  toRaw,
  track,
  trigger,
  onScopeDispose,
  pauseTracking,
  ReactiveEffectRunner,
  stop,
  ReactiveEffectOptions,
  effect,
  ITERATE_KEY,
} from '@vue/reactivity/dist/reactivity'

declare const ComputedRefSymbol: unique symbol
declare const RawSymbol: unique symbol
declare const RefSymbol: unique symbol
declare const ShallowReactiveMarker: unique symbol
declare const ShallowRefMarker: unique symbol

declare type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null
declare type BaseTypes = string | number | boolean
declare type Builtin = Primitive | Function | Date | Error | RegExp
declare type WeakCollections = WeakMap<any, any> | WeakSet<any>
declare type IterableCollections = Map<any, any> | Set<any>
declare type CollectionTypes = IterableCollections | WeakCollections

export declare type FunctionalRef<
  T = any,
  Writable extends boolean = boolean
> = {
  (): T
} & (Writable extends true
  ? {
      set: (value: T) => void
      mutate: (mutator: (value: T) => void) => void
    }
  : {})

export declare interface ComputedRef<T = any> extends WritableComputedRef<T> {
  set: never
  readonly value: T
  [ComputedRefSymbol]: true
}
export declare function computed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): ComputedRef<T>
export declare function computed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): WritableComputedRef<T>

export declare function deferredComputed<T>(getter: () => T): ComputedRef<T>

export declare type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
export declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

export type ReadonlyRef<T> = Omit<Readonly<T>, 'set'> & FunctionalRef<T, false>

export declare type DeepReadonly<T> = T extends Ref<infer U>
  ? ReadonlyRef<Ref<DeepReadonly<U>>>
  : T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends Ref<infer U>
  ? Readonly<Ref<DeepReadonly<U>>>
  : T extends {}
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>
    }
  : Readonly<T>

export declare function isRef<T>(r: Ref<T> | unknown): r is Ref<T>

export declare function markRaw<T extends object>(
  value: T
): T & {
  [RawSymbol]?: true
}

export declare function proxyRefs<T extends object>(
  objectWithRefs: T
): ShallowUnwrapRef<T>

/**
 * Creates a reactive copy of the original object.
 *
 * The reactive conversion is "deep"—it affects all nested properties. In the
 * ES2015 Proxy based implementation, the returned proxy is **not** equal to the
 * original object. It is recommended to work exclusively with the reactive
 * proxy and avoid relying on the original object.
 *
 * A reactive object also automatically unwraps refs contained in it, so you
 * don't need to use `.value` when accessing and mutating their value:
 *
 * ```js
 * const count = ref(0)
 * const obj = reactive({
 *   count
 * })
 *
 * obj.count++
 * obj.count // -> 1
 * count.value // -> 1
 * ```
 */
export declare function reactive<T extends object>(
  target: T
): UnwrapNestedRefs<T>

/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
export declare function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>

export declare interface Ref<T = any> extends FunctionalRef<T, true> {
  value: T
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true
}

export declare function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>

export declare function ref<T>(value: T): Ref<UnwrapRef<T>>

export declare function ref<T = any>(): Ref<T | undefined>

export declare type ShallowReactive<T> = T & {
  [ShallowReactiveMarker]?: true
}

/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
export declare function shallowReactive<T extends object>(
  target: T
): ShallowReactive<T>

export declare type ShallowRef<T = any> = Ref<T> & {
  [ShallowRefMarker]?: true
}

export declare function shallowRef<T extends object>(
  value: T
): T extends Ref ? T : ShallowRef<T>

export declare function shallowRef<T>(value: T): ShallowRef<T>

export declare function shallowRef<T = any>(): ShallowRef<T | undefined>

export declare type ShallowUnwrapRef<T> = {
  [K in keyof T]: T[K] extends Ref<infer V>
    ? V
    : T[K] extends Ref<infer V> | undefined
    ? unknown extends V
      ? undefined
      : V | undefined
    : T[K]
}

export declare type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>

export declare function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]>

export declare function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: T[K]
): ToRef<Exclude<T[K], undefined>>

export declare type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}

export declare function toRefs<T extends object>(object: T): ToRefs<T>

export declare function triggerRef(ref: Ref): void

export declare function unref<T>(ref: T | Ref<T>): T

export declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T>

export declare type UnwrapRef<T> = T extends ShallowRef<infer V>
  ? V
  : T extends Ref<infer V>
  ? UnwrapRefSimple<V>
  : UnwrapRefSimple<T>

declare type UnwrapRefSimple<T> = T extends
  | Function
  | CollectionTypes
  | BaseTypes
  | Ref
  | RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
  | {
      [RawSymbol]?: true
    }
  ? T
  : T extends Array<any>
  ? {
      [K in keyof T]: UnwrapRefSimple<T[K]>
    }
  : T extends object & {
      [ShallowReactiveMarker]?: never
    }
  ? {
      [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>
    }
  : T

export declare interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}
