import { Task } from '../entities/task'

export interface GetListsDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly tasksCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface GetListDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly tasks: {
    id: number
    title: string
    description: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
  }[]
}

export interface CreateListDto {
  readonly title: string
  readonly description: string
}

export interface CreatedListDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface UpdateListDto {
  readonly title: string
  readonly description: string
}

export interface UpdatedListDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly updatedAt: Date
}
