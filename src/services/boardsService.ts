import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import {
  CreateBoardDto,
  CreatedBoardDto,
  GetBoardDto,
  GetBoardCountDto,
  UpdateBoardDto,
  UpdatedBoardDto,
} from '../dto/boardsDto'
import { Board } from '../entities/board'
import { BoardRepository } from '../repositories/boardRepository'

export class BoardService {
  static async getBoards(): Promise<GetBoardCountDto[]> {
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

  static async getBoard(id: number): Promise<GetBoardDto> {
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

  static async updateBoard(
    id: number,
    boardDto: UpdateBoardDto
  ): Promise<UpdatedBoardDto> {
    const board: Board = await BoardRepository.updateBoard(id, boardDto)

    if (!board) {
      throw new HttpException(404, 'not found')
    }

    return {
      id: board.id,
      title: board.title,
      description: board.description,
      updatedAt: board.updatedAt,
    }
  }

  static async createBoard(boardDto: CreateBoardDto): Promise<CreatedBoardDto> {
    const board: Board = await BoardRepository.createBoard(boardDto)

    if (!board) {
      throw new HttpException(400, 'Bad request')
    }

    return {
      id: board.id,
      title: board.title,
      description: board.description,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    }
  }
}
