<script setup lang="ts">
  import { ref } from 'vue'
  import TaskLevelPicker from './TaskLevelPicker.vue'
  import useTask from '@/composables/useTask'
  import { useMessage } from 'naive-ui'

  const showModal = ref(false)
  const { createTask, detailTask, getTaskDetail, updateTask } = useTask()
  const message = useMessage()

  const formData = ref({
    id: 0,
    name: '',
    description: '',
    level: 1,
  })
  const updateMode = ref(false)

  const show = () => {
    showModal.value = true
  }

  const close = () => {
    showModal.value = false
  }

  const update = async (id: number) => {
    await getTaskDetail(id)

    formData.value = {
      id,
      name: detailTask.value.name,
      description: detailTask.value.description,
      level: detailTask.value.level.id
    }

    updateMode.value = true
    show()
  }

  const emit = defineEmits(['refetch'])

  const resetForm = () => {
    formData.value = {
      id: 0,
      name: '',
      description: '',
      level: 1,
    }

    updateMode.value = false
  }

  const submit = () => {
    if (formData.value.name) {
      if (!updateMode.value) {
        createTask(
          formData.value.name,
          formData.value.description,
          formData.value.level,
        ).then(() => {
          emit('refetch')
          resetForm()
          close()
        }).catch(() => {
          message.warning('Terjadi kesalahan, harap coba lagi')
        })
      } else {
        updateTask(
          formData.value.id,
          formData.value.name,
          formData.value.description,
          formData.value.level,
        ).then(() => {
          emit('refetch')
          resetForm()
          close()
        }).catch(() => {
          message.warning('Terjadi kesalahan, harap coba lagi')
        })
      }
    } else {
      message.warning('Harap lengkapi data terlebih dahulu')
    }
  }

  defineExpose({
    show,
    close,
    update,
  })
</script>

<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="updateMode ? 'Ubah Task' : 'Buat Task'"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button
          text
          @click="close()"
        >
          <span class="text-gray-400">Tutup</span>
        </n-button>
      </template>

      <div class="flex flex-col">
        <small class="mb-2 text-slate-400">Judul Task</small>
        <n-input
          v-model:value="formData.name"
          type="text"
          placeholder="Judul Task"
          class="mb-4"
        />
  
        <small class="mb-2 text-slate-400">Deskripsi Task</small>
        <n-input
          v-model:value="formData.description"
          type="textarea"
          placeholder="Deskripsi Task"
          class="mb-3"
        />
  
        <small class="mb-2 text-slate-400">Level Task</small>
        <TaskLevelPicker v-model="formData.level" />
      </div>

      <n-divider />
      <n-button block @click="submit">Simpan Task</n-button>
    </n-card>
  </n-modal>
</template>