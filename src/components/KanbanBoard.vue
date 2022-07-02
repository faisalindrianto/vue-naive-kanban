<script setup lang="ts">
  import type { KanbanGroup } from '@/types'
 import draggable from 'vue3-draggable'

  interface KanbanProps {
    value: KanbanGroup[]
  }

  const props = defineProps<KanbanProps>()
</script>

<template>
  <div class="kanban">
    <div class="flex">
      <n-card
        v-for="(group, index) in props.value"
        :key="`group-${group.id}`"
        class="mr-4 kanban-column"
        :class="index === props.value.length - 1 ? 'special-margin' : null"
        size="small"
      >
        <h1 class="mt-2">{{ group.name }}</h1>
        <n-divider />
        <draggable
          v-model="group.tasks"
          transition="300"
          class="h-50"
        >
          <template #item="{item}">
            <slot
              name="kanban-card"
              :data="item"
            >
              <n-card class="mb-2">
                {{ item.name }}
              </n-card>
            </slot>
          </template>
        </draggable>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.kanban {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 16px;
}

.special-margin {
  margin-right: 0 !important;
}

@media screen and (max-width: 1200px) {
  .kanban-column {
    min-width: 320px;
    width: 320px;
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background: #2f2f33;
}
</style>