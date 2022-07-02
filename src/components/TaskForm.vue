<script setup lang="ts">
  import { ref } from 'vue'

  const showModal = ref(false)

  const show = () => {
    showModal.value = true
  }

  const close = () => {
    showModal.value = false
  }

  defineExpose({
    show,
    close,
  })
</script>

<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Buat Task"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button
          text
          @click="close()"
        >
          Tutup
        </n-button>
      </template>

      <n-input
        type="text"
        label="Judul Task"
        placeholder="Judul Task"
        class="mb-2"
      />

      <n-input
        type="textarea"
        label="Deskripsi Task"
        placeholder="Deskripsi Task"
      />

      
    </n-card>
  </n-modal>
</template>