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
    },
    isDetail: {
      type: Boolean,
      default: false,
    }
  })

  const viewDetail = () => router.push({ name: 'detail', params: { id: props.task.id } })

  const emit = defineEmits(['edit', 'delete'])

  const handleAction = key => {
    if (key === 3) {
      return emit('delete')
    }

    if (key === 2) {
      return emit('edit')
    }

    return viewDetail()
  }
</script>

<template>
  <n-card
    class="cursor-pointer"
    size="small"
    @click="props.isDetail ? null : viewDetail()"
  >
    <h1>{{ props.task.name }}</h1>
    <p class="text-xs text-slate-400 mb-2">{{ props.task.description }}</p>
    <div class="flex items-center">
      <n-tag
        size="small"
        :type="resolveLevelColor(props.task.level.id)"
      >
        {{ props.task.level.name }}
      </n-tag>

      <n-dropdown
        v-if="!props.isDetail"
        trigger="click"
        :options="[
          { key: 1, label: 'Lihat Detail' },
          { key: 2, label: 'Ubah' },
          { key: 3, label: 'Hapus' },
        ]"
        @select="handleAction"
      >
        <n-button
          size="tiny"
          class="ml-auto"
          @click.stop
        >
          Aksi
        </n-button>
      </n-dropdown>
    </div>
  </n-card>
</template>