import { Board } from '../models/board'
import { List } from '../models/list'
import { Task } from '../models/task'

const tasks: Task[] = [
  {
    id: 1,
    title: 'watch',
    description: 'for 3 week',
    completed: false,
    createdAt: new Date(),
    deletedAt: new Date(),
    updatedAt: new Date(),
    tags: {
      description: ['anime', 'apple', 'L'],
    },
  },
]

const lists: List[] = [
  {
    id: 1,
    title: 'death note',
    description: 'fucking yagami light',
    createdAt: new Date(),
    deletedAt: new Date(),
    updatedAt: new Date(),
    tasks: tasks,
  },
]

let boardsIdCounter = 2
const boards: Board[] = [
  {
    id: 1,
    title: 'anime',
    description: 'amazing anime series',
    createdAt: new Date(),
    deletedAt: new Date(),
    updatedAt: new Date(),
    lists: lists,
  },
]

export function getBoards(): Board[] {
  return boards
}

export function getBoard(id: number): Board | undefined {
  return boards.find((board) => board.id === id)
}

export function createBoard(board: Board): Board {
  board.id = boardsIdCounter++
  boards.push(board)
  return board
}

export function deleteBoard(id: number) {
  const index = boards.findIndex((b) => b.id === id)

  if (index < 0) {
    return
  }

  boards.splice(index, 1)
}

export function updateBoard(
  id: number,
  board: Partial<Board>
): Board | undefined {
  const index = boards.findIndex((b) => b.id === id)

  if (index < 0) {
    return
  }

  if (board.title) boards[index].title = board.title
  if (board.description) boards[index].description = board.description

  boards[index].updatedAt = new Date()

  return boards[index]
}
