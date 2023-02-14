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
import { PayloadDto } from '../dto/userDto'
import { Board } from '../entities/board'
import { User } from '../entities/user'
import * as boardRepository from '../repositories/boardRepository'
import * as userRepository from '../repositories/userRepository'

export async function getBoards(
  payload: PayloadDto
): Promise<GetBoardCountDto[]> {
  const boards = await boardRepository.getBoardsWithCount(payload.id)

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

export async function getBoard(
  id: number,
  payload: PayloadDto
): Promise<GetBoardDto> {
  const board = await boardRepository.getBoardById(id, payload.id)

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
  boardDto: UpdateBoardDto,
  payload: PayloadDto
): Promise<UpdatedBoardDto> {
  const dbBoard = await getRepository(Board)
    .createQueryBuilder('board')
    .where('board.user = :userId', { userId: payload.id })
    .andWhere('board.id = :id', { id })
    .getOneOrFail()
    .catch((error) => {
      throw new HttpException(404, 'Board with id = :id not found', { id })
    })

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
  boardDto: CreateBoardDto,
  payload: PayloadDto
): Promise<CreatedBoardDto> {
  const board = new Board({
    title: boardDto.title,
    description: boardDto.description,
    user: new User({ id: payload.id }),
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

export async function removeBoard(
  id: number,
  payload: PayloadDto
): Promise<void> {
  const board = await getRepository(Board)
    .createQueryBuilder('board')
    .where('board.user = :userId', { userId: payload.id })
    .andWhere('board.id = :id', { id })
    .getOneOrFail()
    .catch(() => {
      throw new HttpException(
        404,
        'Board with id = :id not found or already deleted',
        { id }
      )
    })
  await boardRepository.deleteBoardById(board)
}
