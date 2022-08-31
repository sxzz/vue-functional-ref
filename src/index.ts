import {
  isRef,
  computed as vueComputed,
  customRef as vueCustomRef,
  readonly as vueReadonly,
  ref as vueRef,
  shallowRef as vueShallowRef,
} from '@vue/reactivity'
import type { Ref } from '@vue/reactivity'

export * from '@vue/reactivity'

function toRawRef(raw: any): any {
  return raw.__raw_ref ? toRawRef(raw.__raw_ref) : raw
}

function toFunctional(raw: Ref<any>, readonly: boolean): any {
  const fn = () => raw.value

  const proxyKeys = [
    'construct',
    'defineProperty',
    'deleteProperty',
    'getOwnPropertyDescriptor',
    'getPrototypeOf',
    'has',
    'isExtensible',
    'ownKeys',
    'preventExtensions',
    'setPrototypeOf',
  ] as const

  const handlers = Object.fromEntries(
    proxyKeys.map((key) => [
      key,
      (target: any, ...args: any[]) => (Reflect[key] as any)(raw, ...args),
    ])
  )

  return new Proxy(fn, {
    ...handlers,
    get(target, key, receiver) {
      if (!readonly && key === 'set') {
        return (value: any) => (raw.value = value)
      } else if (key === '__raw_ref') {
        return toRawRef(raw)
      } else {
        return Reflect.get(raw, key, receiver)
      }
    },
    set(target, key, newValue, receiver) {
      if (key === 'set') return false
      return Reflect.set(raw, key, newValue, receiver)
    },
  })
}

export const ref: typeof vueRef = ((value: any) =>
  toFunctional(vueRef(value), false)) as any

export const computed: typeof vueComputed = (getter: any, debugOptions: any) =>
  toFunctional(vueComputed(getter, debugOptions), typeof getter === 'function')

export const shallowRef: typeof vueShallowRef = ((value: any): any =>
  toFunctional(vueShallowRef(value), false)) as any

export const customRef: typeof vueCustomRef = ((value: any): any =>
  toFunctional(vueCustomRef(value), false)) as any

export const readonly: typeof vueReadonly = (target: any): any => {
  if (!isRef(target)) {
    return vueReadonly(target)
  }
  return toFunctional(vueReadonly((target as any).__raw_ref), true)
}
