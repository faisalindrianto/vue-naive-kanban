<script setup lang="ts">
  import TaskForm from '@/components/TaskForm.vue'
  import TaskCard from '@/components/TaskCard.vue'

  import { onMounted, computed } from 'vue'
  import useTask from '@/composables/useTask'
  import useAuth from '@/composables/useAuth'
  import { ref } from 'vue'

  const {
    taskList, levelList, statusList,
    getTaskList, getStatusList, getLevelList,
  } = useTask()

  const { logout } = useAuth()

  const taskForm = ref()

  const formattedKanbanTask = computed(() => null)

  onMounted(() => {
    getStatusList()
    getLevelList()
    getTaskList()
  })
</script>

<template>
  <div class="container">
    <n-card class="mb-4">
      <div class="flex mb-4 items-center">
        <h1 class="text-2xl">Halo!</h1>
        <n-button
          text
          class="ml-auto"
          @click="logout"
        >
          Logout
        </n-button>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center">
        <p>Berikut adalah daftar taskmu!</p>
        <n-button
          class="mt-4 sm:mt-0 sm:ml-auto"
          @click="taskForm.show()"
        >
          Buat Task Baru
        </n-button>
      </div>
    </n-card>

    <n-card>
      <n-input type="text" placeholder="Cari task..." />

      <TaskCard
        v-for="task in taskList"
        :key="task.id"
        :task="task"
      />
    </n-card>

    <TaskForm ref="taskForm" />
  </div>
</template>
