import mock from '../mock'

const data = {
  status: [
    {
      id: 1,
      name: 'Belum Dikerjakan',
    },
    {
      id: 2,
      name: 'Sedang Dikerjakan',
    },
    {
      id: 3,
      name: 'Sudah Dikerjakan',
    },
  ],
  level: [
    {
      id: 1,
      name: 'Low',
    },
    {
      id: 2,
      name: 'Medium',
    },
    {
      id: 3,
      name: 'Urgent',
    },
  ],
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      status: 1,
      level: 1,
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      status: 1,
      level: 3,
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      status: 1,
      level: 2,
    },
    {
      id: 4,
      name: 'Task 4',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      deadline: '',
      status: 2,
      level: 2,
    },
    {
      id: 5,
      name: 'Task 5',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      status: 2,
      level: 3,
    },
    {
      id: 6,
      name: 'Task 6',
      description: 'Lorem ipsum Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      status: 3,
      level: 2,
    },
  ],
}

mock.onGet('/kanban/status').reply(() => {
  return [200, data.status]
})

mock.onGet('/kanban/level').reply(() => {
  return [200, data.level]
})

mock.onGet('/kanban/tasks').reply(() => {
  return [200, data.tasks]
})

mock.onGet('/kanban/tasks/detail').reply(request => {
  console.log(request)

  return [200, data.tasks]
})
