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
import * as boardRepository from '../repositories/boardRepository'

export async function getBoards(): Promise<GetBoardCountDto[]> {
  const boards = await boardRepository.getBoardsWithCount()

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

export async function getBoard(id: number): Promise<GetBoardDto> {
  const board = await boardRepository.getBoardById(id)

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

export async function updateBoard(
  id: number,
  boardDto: UpdateBoardDto
): Promise<UpdatedBoardDto> {
  const board: Board = await boardRepository.updateBoard(id, boardDto)

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

export async function createBoard(
  boardDto: CreateBoardDto
): Promise<CreatedBoardDto> {
  const board: Board = await boardRepository.createBoard(boardDto)

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
