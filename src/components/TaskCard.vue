<script setup lang="ts">
  import useTask from '@/composables/useTask'
  import { useRouter } from 'vue-router'

  const { resolveLevelColor } = useTask()
  const router = useRouter()

  const props = defineProps({
    task: {
      type: Object,
      default: null,
      required: true,
    }
  })
</script>

<template>
  <n-card
    class="cursor-pointer"
    @click="router.push({ name: 'detail', params: { id: props.task.id } })"
  >
    <h1>{{ props.task.name }}</h1>
    <p class="text-xs text-slate-400 mb-2">{{ props.task.description }}</p>
    <n-tag
      size="small"
      :type="resolveLevelColor(props.task.level.id)"
    >
      {{ props.task.level.name }}
    </n-tag>
  </n-card>
</template>