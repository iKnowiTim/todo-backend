export interface Task {
  id: number
  title: string
  description: string
  tags: {
    description: string[]
  }
  completed: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
