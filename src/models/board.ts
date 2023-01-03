import { List } from './list'

export interface Board {
  id: number
  description: string
  title: string
  lists: List[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
