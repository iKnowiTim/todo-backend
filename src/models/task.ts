import { Tag } from './tag'

export interface Task {
  id: number
  title: string
  description?: string
  tags?: Tag[]
  completed: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
