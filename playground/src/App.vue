<script setup lang="ts">
import { computed, ref } from 'vue'
const count = ref(0)
const double = computed(() => count() * 2)
const obj = ref({ name: 'sxzz', age: 18 })

function inc() {
  count.set(count() + 1)
  console.info('double:', double())

  obj.mutate((obj) => obj.age++)
}
</script>

<template>
  <div>
    <div>{{ count }} * 2 = {{ double }}</div>
    <button @click="inc">Increment</button>
  </div>
  <pre>{{ obj }}</pre>
</template>
