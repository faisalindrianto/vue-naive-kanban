import { ref } from 'vue'
import axios from 'axios'

const useTask = () => {
  interface Status {
    id: number
    name: string
  }

  interface Level {
    id: number
    name: string
  }

  interface Task {
    id: number
    name: string
    description: string
    level: Level
    status: Status
  }

  const taskList = ref<Task[]>([])
  const statusList = ref<Status[]>([])
  const levelList = ref<Level[]>([])
  const loadingTask = ref(false)

  const detailTask = ref()
  const loadingTaskDetail = ref(false)

  const getTaskList = () => {
    loadingTask.value = true
    axios.get('/kanban/tasks').then(result => {
      taskList.value = result.data.map(el => ({
        ...el,
        status: statusList.value.find(status => status.id === el.status),
        level: levelList.value.find(level => level.id === el.level),
      }))
      loadingTask.value = false
    }).catch(() => {
      loadingTask.value = false
    })
  }

  const createTask = () => {}

  const updateTask = () => {}

  const deleteTask = () => {}

  const getStatusList = () => {
    axios.get('/kanban/status').then(result => {
      statusList.value = result.data
    })
  }

  const getLevelList = () => {
    axios.get('/kanban/level').then(result => {
      levelList.value = result.data
    })
  }

  const getTaskDetail = () => {
    axios.get('/kanban/level').then(result => {
      console.log(result)
    })
  }

  const resolveLevelColor = id => {
    if (id === 3) return 'error'
    if (id === 2) return 'warning'

    return 'info'
  }

  return {
    taskList,
    statusList,
    levelList,
    loadingTask,
    detailTask,
    loadingTaskDetail,

    getTaskList,
    createTask,
    updateTask,
    deleteTask,
    getStatusList,
    getLevelList,
    getTaskDetail,
    resolveLevelColor,
  }
}

export default useTask
