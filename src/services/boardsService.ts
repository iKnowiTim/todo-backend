import { Board } from '../models/board'
import {
  GetBoardResponseDto,
  GetBoardsWithCountsResponseDto,
  CreateBoardRequestDto,
  CreateBoardResponseDto,
  UpdateBoardRequestDto,
  UpdateBoardResponseDto,
} from '../dto/boardsDto'
import * as boardsRepository from '../repositories/boardsRepository'

export function getBoards(): GetBoardsWithCountsResponseDto[] {
  const boards = boardsRepository.getBoards()

  return boards.map((board) => {
    return {
      id: board.id,
      title: board.title,
      description: board.description,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      listsCount: board.lists.length,
      tasksCount: board.lists
        .map((list) => list.tasks.length)
        .reduce((sum, n) => sum + n, 0),
    }
  })
}

export function getBoard(id: number): GetBoardResponseDto | string {
  const board = boardsRepository.getBoard(id)

  if (!board) {
    return 'Not found'
  }

  return {
    id: board.id,
    title: board.title,
    description: board.description,
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
    lists: board.lists.map((list) => ({
      id: list.id,
      title: list.title,
      description: list.description,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
      tasks: list.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        tags: [],
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })),
    })),
  }
}

export function createBoard(
  dto: CreateBoardRequestDto
): CreateBoardResponseDto {
  const created = boardsRepository.createBoard({
    id: 0,
    title: dto.title,
    description: dto.description ?? 'Здесь может быть описание',
    createdAt: new Date(),
    deletedAt: new Date(),
    updatedAt: new Date(),
    lists: [],
  })

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

export function deleteBoard(id: number) {
  boardsRepository.deleteBoard(id)
}

export function updateBoard(
  id: number,
  dto: UpdateBoardRequestDto
): UpdateBoardResponseDto {
  const { description, title } = dto

  const updated = boardsRepository.updateBoard(id, {
    title,
    description,
  })

  if (!updated) {
    throw new Error('Not found')
  }

  return {
    id: updated.id,
    description: updated.description,
    title: updated.title,
    updatedAt: updated.updatedAt,
  }
}