import {
  computed as vueComputed,
  customRef as vueCustomRef,
  ref as vueRef,
  shallowRef as vueShallowRef,
} from '@vue/reactivity'
import type { Ref } from '@vue/reactivity'

export * from '@vue/reactivity'

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
      }
      return Reflect.get(raw, key, receiver)
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
