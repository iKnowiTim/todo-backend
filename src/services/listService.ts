import { HttpException } from '../common/httpException'
import {
  CreatedListDto,
  CreateListDto,
  GetListDto,
  GetListsDto,
  UpdatedListDto,
  UpdateListDto,
} from '../dto/listsDto'
import * as listRepository from '../repositories/listRepository'
import * as boardRepository from '../repositories/boardRepository'
import { getRepository } from 'typeorm'
import { List } from '../entities/list'
import { Board } from '../entities/board'
import { PayloadDto } from '../dto/userDto'

export async function getLists(
  boardId: number,
  payload: PayloadDto
): Promise<GetListsDto[]> {
  const lists = await listRepository.getLists(boardId, payload.id)

  const listsDto: GetListsDto[] = lists.map((list) => ({
    id: list.id,
    title: list.title,
    description: list.description,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
    tasksCount: list.tasksCount,
  }))

  return listsDto
}

export async function getList(
  id: number,
  payload: PayloadDto
): Promise<GetListDto> {
  const list = await listRepository.getListById(id, payload.id)

  if (!list) {
    throw new HttpException(404, 'List with id = :id not found', {
      id,
    })
  }

  return {
    id: list.id,
    title: list.title,
    description: list.description,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
    tasks: list.tasks!.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      completed: task.completed,
      deletedAt: task.deletedAt,
    })),
  }
}

export async function updateList(
  id: number,
  listDto: UpdateListDto,
  payload: PayloadDto
): Promise<UpdatedListDto> {
  const dbList = await listRepository.getListById(id, payload.id)

  if (!dbList) {
    throw new HttpException(404, 'List with id = :id not found', { id })
  }

  const list = new List(dbList)

  list.title = listDto.title ?? dbList.title
  list.description = listDto.description ?? dbList.description
  list.updatedAt = new Date()

  await listRepository.updateList(list)

  return {
    id: list.id,
    title: list.title,
    description: list.description,
    updatedAt: list.updatedAt,
  }
}

export async function createList(
  boardId: number,
  listDto: CreateListDto,
  payload: PayloadDto
): Promise<CreatedListDto> {
  const board = await getRepository(Board)
    .createQueryBuilder('board')
    .where('board.id = :boardId', { boardId })
    .andWhere('board.user = :userId', { userId: payload.id })
    .getOneOrFail()
    .catch(() => {
      throw new HttpException(404, 'Board with id = :boardId not found', {
        boardId,
      })
    })

  const list = new List({
    title: listDto.title,
    description: listDto.description,
    board: board,
  })

  const created = await listRepository.createList(list)

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

export async function removeList(
  id: number,
  payload: PayloadDto
): Promise<void> {
  const list = await getRepository(List)
    .createQueryBuilder('list')
    .leftJoin('list.board', 'board')
    .where('list.id = :id', { id })
    .andWhere('board.user = :userId', { userId: payload.id })
    .getOneOrFail()
    .catch(() => {
      throw new HttpException(
        404,
        'List with id = :id not found or already deleted',
        { id }
      )
    })

  await listRepository.removeListById(list)
}
