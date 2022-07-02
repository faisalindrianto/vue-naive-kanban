<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import useTask from '@/composables/useTask'

  const { levelList, getLevelList } = useTask()

  onMounted(() => {
    getLevelList()
  })

  const options = computed(() => levelList.value.map(el => ({
    label: el.name,
    key: el.id,
  })))

  const handleSelect = (key: number) => {
    console.log(key)
  }
</script>

<template>
  <small>Level Task</small>
  <n-dropdown
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <n-button>Go For a Trip</n-button>
  </n-dropdown>
</template>