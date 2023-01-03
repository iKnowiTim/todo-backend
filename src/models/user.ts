import { Board } from './board'

interface User {
  id: number
  username: string
  login: string
  password: string
  boards: Board[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
