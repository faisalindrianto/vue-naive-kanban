<script setup lang="ts">
  import TaskCard from '../components/TaskCard.vue'
  import TaskForm from '@/components/TaskForm.vue'
  import { ref, onMounted } from 'vue'
  import useTask from '@/composables/useTask'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { detailTask, getTaskDetail, deleteTask } = useTask()
  const taskForm = ref()
  
  const props = defineProps({
    id: {
      type: [Number, String],
      default: null
    }
  })

  const handleDeleteTask = () => {
    deleteTask(+props.id).then(() => {
      router.push('/')
    })
  }

  onMounted(() => {
    if (props.id) {
      getTaskDetail(+props.id)
    }
  })
</script>

<template>
  <div class="container">
    <n-button
      text
      class="text-gray-400"
      @click="router.back()"
    >
      Kembali
    </n-button>
    <div class="flex items-center mb-4 mt-4">
      <h1 class="text-xl">Detail Task</h1>
      <n-button
        class="ml-auto mr-3"
        @click="taskForm.update(+props.id)"
      >
        Ubah
      </n-button>
      <n-button
        type="error"
        class="text-red-500"
        @click="handleDeleteTask"
      >
        Hapus
      </n-button>
    </div>
    <TaskCard
      v-if="detailTask.id"
      :task="detailTask"
      is-detail
    />

    <TaskForm ref="taskForm" @refetch="getTaskDetail(+props.id)" />
  </div>
</template>
