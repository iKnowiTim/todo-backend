import { getRepository } from 'typeorm'
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
import * as userRepository from '../repositories/userRepository'

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
    throw new HttpException(404, 'Board with id = :id not found', { id })
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
  const dbBoard = await getRepository(Board).findOne(id)

  if (!dbBoard) {
    throw new HttpException(404, 'Board with id = :id not found', { id })
  }

  const board = new Board(dbBoard)

  board.title = boardDto.title ?? dbBoard.title
  board.description = boardDto.description ?? dbBoard.description
  board.updatedAt = new Date()

  const updated = await boardRepository.updateBoard(board)

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    updatedAt: updated.updatedAt,
  }
}

export async function createBoard(
  boardDto: CreateBoardDto
): Promise<CreatedBoardDto> {
  const user = await userRepository.getUserById(1)

  if (!user) {
    throw new HttpException(404, 'User with id = 1 not found')
  }

  const board = new Board({
    title: boardDto.title,
    description: boardDto.description,
    user: user,
  })

  const created = await boardRepository.createBoard(board)

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

export async function removeBoard(id: number): Promise<void> {
  const board = await getRepository(Board).findOne(id)

  if (!board) {
    throw new HttpException(
      404,
      'Board with id = :id not found or already deleted',
      { id }
    )
  }
  await boardRepository.deleteBoardById(board)
}
