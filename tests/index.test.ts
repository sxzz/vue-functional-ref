import { expect, test } from 'vitest'
import { computed, ref } from '../src'

// const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

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

  // @ts-expect-error without set property
  expect(double.set).toBeUndefined()

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
