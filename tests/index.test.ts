import { expect, test, vi } from 'vitest'
import { expectTypeOf } from 'expect-type'
import {
  computed,
  customRef,
  isReadonly,
  isRef,
  reactive,
  readonly,
  ref,
  shallowRef,
  toRef,
  toRefs,
  unref,
  watchEffect,
} from 'vue'
import type * as proxyType from '@vue/reactivity'
import type * as vueReactivityType from '@vue/reactivity/dist/reactivity'
import type * as vue from 'vue'

const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

vi.mock('vue', async () => {
  return {
    ...(await vi.importActual<typeof vue>('vue')),
    ...(await import('../src')),
  }
})

const { ref: vueRef } = await vi.importActual<typeof vue>('vue')

test('ref', () => {
  const foo = ref()
  expect(foo()).toBe(undefined)

  const bar = ref<number | undefined>(1)
  expect(bar()).toBe(1)
  bar.set(2)
  expect(bar()).toBe(2)

  bar.set(undefined)
  expect(bar()).toBe(undefined)
})

test('computed', () => {
  const count = ref(0)
  const double = computed(() => count() * 2)

  expect(double()).toBe(0)

  count.set(1)
  expect(double()).toBe(2)

  expectTypeOf(double.set).toBeNever()
  expect(double.set).toBeUndefined()

  // @ts-expect-error set is never
  expect(() => double.set()).toThrowErrorMatchingInlineSnapshot(
    '"double.set is not a function"'
  )

  expect(double.effect).not.toBeUndefined()
})

test('writable computed', () => {
  const count = ref(0)
  const double = computed({
    get: () => count() * 2,
    set: (value) => count.set(value / 2),
  })

  expect(double()).toBe(0)

  count.set(1)
  expect(double()).toBe(2)

  expect(double.set).not.toBeUndefined()
  expect(double.effect).not.toBeUndefined()

  double.set(10)
  expect(count()).toBe(5)
  expect(double()).toBe(10)
})

test('shallowRef', () => {
  const foo = shallowRef()
  expect(foo()).toBe(undefined)

  const bar = shallowRef<number | undefined>(1)
  expect(bar()).toBe(1)
  bar.set(2)
  expect(bar()).toBe(2)

  bar.set(undefined)
  expect(bar()).toBe(undefined)
})

test('toRef', () => {
  const obj = reactive({ key: 'value' })
  const key = toRef(obj, 'key')

  expect(key()).toBe('value')

  key.set('new value')
  expect(obj.key).toBe('new value')
})

test('toRefs', () => {
  const obj = reactive({ key: 'value', foo: 'bar' })
  const { key, foo } = toRefs(obj)

  expect(key()).toBe('value')
  key.set('new value')
  expect(obj.key).toBe('new value')

  expect(foo()).toBe('bar')
  foo.set('baz')
  expect(obj.foo).toBe('baz')
})

test('customRef', () => {
  let value = 10
  const number = customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue) {
      trigger()
      value = newValue
    },
  }))
  expect(number()).toBe(10)
  number.set(2)
  expect(number()).toBe(2)
})

test('isRef', () => {
  const foo = ref()
  expect(isRef(foo)).toBe(true)
  expect(isRef(1)).toBe(false)
  expect(
    isRef(() => {
      //
    })
  ).toBe(false)
})

test('unref', () => {
  const foo = ref(ref('hello'))
  expect(unref(foo)).toBe('hello')
  expect(unref(1)).toBe(1)
})

test('readonly', () => {
  const msg = readonly(ref('Hello World!'))
  expect(isReadonly(msg)).toBe(true)
  // @ts-expect-error set is never
  expect(msg.set).toBeUndefined()

  // @ts-expect-error set is never
  expect(() => msg.set()).toThrowErrorMatchingInlineSnapshot(
    '"msg.set is not a function"'
  )
  expectTypeOf(typeof msg).not.toHaveProperty('set')

  const nested = readonly(ref(ref('hello')))
  expect(isReadonly(nested)).toBe(true)
  // @ts-expect-error set is never
  expect(nested.set).toBeUndefined()

  // @ts-expect-error set is never
  expect(() => nested.set()).toThrowErrorMatchingInlineSnapshot(
    '"nested.set is not a function"'
  )

  const obj = readonly({ foo: 'bar' })
  expect(obj).toStrictEqual({ foo: 'bar' })
  expectTypeOf(obj).toEqualTypeOf<{
    readonly foo: string
  }>()
})

test('typeof', () => {
  expect(typeof ref()).toBe('function')
  expect(typeof vueRef()).toBe('object')
})

test('proxy', () => {
  const msg = readonly(ref('Hello World!'))
  watchEffect(() => (msg.value, undefined))

  expect(warn).not.toBeCalled()
})

test('in operator', () => {
  expect('value' in ref()).toBe(true)
})

test('ownKeys', () => {
  expect(Object.keys(ref())).toMatchInlineSnapshot(`
    [
      "__v_isShallow",
      "dep",
      "__v_isRef",
      "_rawValue",
      "_value",
    ]
  `)
})

test('export types', () => {
  expectTypeOf<keyof typeof proxyType>().toEqualTypeOf<
    keyof typeof vueReactivityType
  >()
})
