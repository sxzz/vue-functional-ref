<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const inc = () => {
  count.set(count() + 1)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="inc">count is {{ count }}</button>
  </div>
</template>
