import { ref } from 'vue'
import axios from 'axios'
import type { Task, Status, Level } from '@/types'
import { useMessage, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'

const useTask = () => {
  const message = useMessage()
  const dialog = useDialog()
  const router = useRouter()

  const taskList = ref<Task[]>([])
  const statusList = ref<Status[]>([])
  const levelList = ref<Level[]>([])
  const loadingTask = ref(false)

  const detailTask = ref(<Task>{})
  const loadingTaskDetail = ref(false)

  const getTaskList = async () => {
    getStatusList()
    getLevelList()

    loadingTask.value = true
    await axios.get('/kanban/tasks').then(result => {
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

  const createTask = (
    name: string, description: string, level: number
  ) => new Promise((resolve, reject) => {
    axios.post('/kanban/create', {
      name,
      description,
      level,
    }).then(result => {
      message.success('Berhasil membuat task')
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })

  const updateTask = (
    id: number, name: string, description: string, level: number
  ) => new Promise((resolve, reject) => {
    axios.patch('/kanban/update', {
      id,
      name,
      description,
      level,
    }).then(result => {
      message.success('Berhasil mengubah task')
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })

  const updateTaskStatus = () => {
    axios.patch('/kanban/update-status', {
      id: 'asdasd'
    })
  }

  const deleteTask = (id: number) => new Promise((resolve, reject) => {
    dialog.info({
      title: 'Hapus Task?',
      content: 'Konfirmasi jika anda ingin menghapus task',
      positiveText: 'Yakin',
      negativeText: 'Batal',
      positiveButtonProps: {
        type: 'default',
      },
      onPositiveClick: () => {
        axios.delete(`/kanban/delete/${id}`).then(result => {
          message.success('Berhasil menghapus task')
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      }
    })
  })

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

  const getTaskDetail = async (id: number) => {
    getLevelList()
    getStatusList()

    loadingTaskDetail.value = true
    await axios.get(`/kanban/tasks/${id}`).then(result => {
      detailTask.value = {
        ...result.data,
        status: statusList.value.find(status => status.id === result.data.status),
        level: levelList.value.find(level => level.id === result.data.level),
      }
      loadingTaskDetail.value = false
    }).catch(err => {
      loadingTaskDetail.value = false
      message.warning('Task tidak ditemukan')
      router.replace('/')
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
    updateTaskStatus,
    deleteTask,
    getStatusList,
    getLevelList,
    getTaskDetail,
    resolveLevelColor,
  }
}

export default useTask
