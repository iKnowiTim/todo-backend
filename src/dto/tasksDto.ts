export interface CreateTaskDto {
  readonly title: string
  readonly description: string
}

export interface CreatedTaskDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface UpdateTaskDto {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

export interface UpdatedTaskDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly updatedAt: Date
}

export interface GetTasksDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}
