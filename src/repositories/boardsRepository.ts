import { GetBoardsWithCountsResponseDto } from '../dto/boardsDto'
import { Board } from '../entities/board'
import { List } from '../entities/list'
import { Task } from '../entities/task'

// export async function getBoards(): Promise<Board[]> {

//   return {}
// }

// export function getBoard(id: number): Board | undefined {
//   return boards.find((board) => board.id === id)
// }

// export function createBoard(board: Board): Board {
//   board.id = boardsIdCounter++
//   boards.push(board)
//   return board
// }

// export function deleteBoard(id: number) {
//   const index = boards.findIndex((b) => b.id === id)

//   if (index < 0) {
//     return
//   }

//   boards.splice(index, 1)
// }

// export function updateBoard(
//   id: number,
//   board: Partial<Board>
// ): Board | undefined {
//   const index = boards.findIndex((b) => b.id === id)

//   if (index < 0) {
//     return
//   }

//   if (board.title) boards[index].title = board.title
//   if (board.description) boards[index].description = board.description

//   boards[index].updatedAt = new Date()

//   return boards[index]
// }
