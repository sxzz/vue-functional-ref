import {
  isRef,
  triggerRef,
  computed as vueComputed,
  customRef as vueCustomRef,
  readonly as vueReadonly,
  ref as vueRef,
  shallowRef as vueShallowRef,
  toRef as vueToRef,
  toRefs as vueToRefs,
} from '@vue/reactivity'

export * from '@vue/reactivity'

function toRawRef(raw: any): any {
  return raw?.__raw_ref ? toRawRef(raw.__raw_ref) : raw
}

function toFunctional(raw: any, readonly: boolean): any {
  if (!isRef(raw)) return raw

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
    ]),
  )

  const set = (value: any) => (raw.value = value)
  const mutate = (mutator: (value: any) => any) => {
    mutator(raw.value)
    triggerRef(raw)
  }

  return new Proxy(fn, {
    ...handlers,
    get(target, key) {
      if (!readonly && key === 'set') return set
      else if (!readonly && key === 'mutate') return mutate
      else if (key === '__raw_ref') {
        return toRawRef(raw)
      } else {
        return Reflect.get(raw, key, raw)
      }
    },
    set(target, key, newValue) {
      if (key === 'set') return false
      return Reflect.set(raw, key, newValue, raw)
    },
  })
}

export const ref: typeof vueRef = ((value: any) => {
  if (isRef(value)) return value
  return toFunctional(vueRef(toRawRef(value)), false)
}) as any

export const computed: typeof vueComputed = (getter: any, debugOptions: any) =>
  toFunctional(vueComputed(getter, debugOptions), typeof getter === 'function')

export const shallowRef: typeof vueShallowRef = ((value: any): any =>
  toFunctional(vueShallowRef(toRawRef(value)), false)) as any

export const customRef: typeof vueCustomRef = ((value: any): any =>
  toFunctional(vueCustomRef(toRawRef(value)), false)) as any

export const readonly: typeof vueReadonly = (target: any): any =>
  toFunctional(vueReadonly(toRawRef(target)), true)

export const toRef: typeof vueToRef = ((
  ...args: Parameters<typeof vueToRef>
): any => toFunctional(vueToRef(...args), false)) as any

export const toRefs: typeof vueToRefs = (obj: any): any => {
  const refs = vueToRefs(obj)
  if (typeof refs !== 'object') return refs
  for (const key of Object.keys(refs)) {
    refs[key] = toFunctional(refs[key], false)
  }
  return refs
}
