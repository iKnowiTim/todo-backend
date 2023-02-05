import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import {
  CreateBoardRequestDto,
  GetBoardResponseDto,
  GetBoardsWithCountsResponseDto,
} from '../dto/boardsDto'
import { BoardRepository } from '../repositories/boardRepository'

export class BoardService {
  static async getBoards(): Promise<GetBoardsWithCountsResponseDto[]> {
    const boards = await BoardRepository.getBoardsWithCount()

    return boards.map((board) => ({
      id: board.id,
      title: board.title,
      description: board.description,
      updatedAt: board.updatedAt,
      createdAt: board.createdAt,
      listsCount: board.listsCount,
      tasksCount: board.tasksCount,
    }))
  }

  static async getBoard(id: number): Promise<GetBoardResponseDto> {
    const board = await BoardRepository.getBoardById(id)

    if (!board) {
      logger.error(board)
      throw new HttpException(404, 'Not found')
    }

    const boardDto = {
      id: board.id,
      title: board.title,
      description: board.description,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      lists: board.lists!.map((list) => ({
        id: list.id,
        title: list.title,
        description: list.description,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        tasks: list.tasks!.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.title,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        })),
      })),
    }

    return boardDto
  }
}
