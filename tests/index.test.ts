import { expect, test } from 'vitest'
import { expectTypeOf } from 'expect-type'
import { ref as vueRef } from '@vue/reactivity'
import {
  computed,
  customRef,
  isReadonly,
  isRef,
  readonly,
  ref,
  shallowRef,
  unref,
} from '../src'
import type * as proxyType from '@vue/reactivity'
import type * as vueType from '@vue/reactivity/dist/reactivity'

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
  const foo = ref('hello')
  expect(unref(foo)).toBe('hello')
  expect(unref(1)).toBe(1)
})

test('readonly', () => {
  const foo = readonly(ref(ref('hello')))
  expect(isReadonly(foo)).toBe(true)
  expect(foo.set).toBeUndefined()

  // @ts-expect-error set is never
  expect(() => foo.set()).toThrowErrorMatchingInlineSnapshot(
    '"foo.set is not a function"'
  )
})

test('typeof', () => {
  expect(typeof ref()).toBe('function')
  expect(typeof vueRef()).toBe('object')
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
  expectTypeOf<keyof typeof proxyType>().toEqualTypeOf<keyof typeof vueType>()
})
