import { expect, test, vi } from 'vitest'
import { computed, ref } from '../src'

const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

test('ref', () => {
  const foo = ref()
  expect(foo()).toBe(undefined)

  const bar = ref<number | undefined>(1)
  expect(bar()).toBe(1)
  bar(2)
  expect(bar()).toBe(2)

  bar(undefined)
  expect(bar()).toBe(undefined)
})

test('computed', () => {
  const count = ref(0)
  const double = computed(() => count() * 2)

  expect(double()).toBe(0)

  count(1)
  expect(double()).toBe(2)

  // @ts-expect-error cannot be assigned
  double(123)
  expect(warn).lastCalledWith(
    'Write operation failed: computed value is readonly'
  )
})
