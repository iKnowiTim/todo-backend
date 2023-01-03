import { Task } from './task'

export interface List {
  id: number
  title: string
  description?: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
