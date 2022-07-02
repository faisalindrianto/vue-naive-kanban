<script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import useTask from '@/composables/useTask'

  const { levelList, getLevelList, resolveLevelColor } = useTask()

  onMounted(() => {
    getLevelList()
  })

  const props = defineProps({
    modelValue: {
      type: Number,
      default: null,
    }
  })

  const emits = defineEmits(['update:modelValue'])

  const options = computed(() => levelList.value.map(el => ({
    label: el.name,
    key: el.id,
  })))

  const handleSelect = (key: number) => {
    emits('update:modelValue', key)
  }

  const selectedOptions = computed(() => options.value.find(el => el.key === props.modelValue))
</script>

<template>
  <div class="flex flex-col">
    <n-dropdown
      trigger="click"
      :options="options"
      @select="handleSelect"
    >
      <n-button :type="resolveLevelColor(selectedOptions?.key)">
        <span class="text-white">{{ selectedOptions ? selectedOptions?.label : 'Pilih Level' }}</span>
      </n-button>
    </n-dropdown>
  </div>
</template>