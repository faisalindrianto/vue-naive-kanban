<script setup lang="ts">
  import TaskForm from '@/components/TaskForm.vue'
  import TaskCard from '@/components/TaskCard.vue'
  import KanbanBoard from '@/components/KanbanBoard.vue'

  import { ref, onMounted, computed } from 'vue'
  import useTask from '@/composables/useTask'
  import useAuth from '@/composables/useAuth'

  const {
    taskList, statusList, loadingTask, getTaskList, deleteTask,
  } = useTask()

  const { logout } = useAuth()

  const taskForm = ref()

  const formattedKanbanTask = computed(() => statusList.value.map(status => ({
    id: status.id,
    name: status.name,
    tasks: taskList.value.filter(task => task.status === status)
  })))

  const handleDeleteTask = (id: number) => {
    deleteTask(id).then(() => {
      getTaskList()
    })
  }

  onMounted(() => {
    getTaskList()
  })
</script>

<template>
  <div>
    <div class="container">
      <n-card class="mb-4">
        <div class="flex mb-4 items-center">
          <h1 class="text-2xl">Halo!</h1>
          <n-button
            text
            class="ml-auto text-gray-500"
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
    </div>
  
    <KanbanBoard
      v-if="!loadingTask"
      :value="formattedKanbanTask"
      class="mb-6 kanban-board"
    >
      <template #kanban-card="{ data }">
        <TaskCard
          :task="data"
          class="mb-2"
          @delete="handleDeleteTask(data.id)"
          @edit="taskForm.update(data.id)"
        />
      </template>
    </KanbanBoard>
    <TaskForm ref="taskForm" @refetch="getTaskList" />
  </div>
</template>

<style>
.kanban-board {
  padding-left: 10vw;
  padding-right: 10vw;
}

@media screen and (max-width: 600px) {
  .kanban-board {
    padding-left: 5vw;
  }
}
</style>
