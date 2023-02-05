export interface createTaskDto {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

export interface createdTaskDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface updateTaskDto {
  readonly title: string
  readonly description: string
}

export interface updatedTaskDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly updatedAt: Date
}

export interface getTasksDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}
