export interface Status {
  id: number
  name: string
}

export interface Level {
  id: number
  name: string
}

export interface Task {
  id: number
  name: string
  description: string
  level: Level
  status: Status
}

export interface KanbanGroup {
  id: number
  name: string
  tasks: Task[]
}