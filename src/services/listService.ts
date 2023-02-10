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

export async function getLists(boardId: number): Promise<GetListsDto[]> {
  const lists = await listRepository.getLists(boardId)

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

export async function getList(id: number): Promise<GetListDto> {
  const list = await listRepository.getListById(id)

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
  listDto: UpdateListDto
): Promise<UpdatedListDto> {
  const dbList = await listRepository.getListById(id)

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
  listDto: CreateListDto
): Promise<CreatedListDto> {
  const board = await getRepository(Board).findOne(boardId)

  if (!board) {
    throw new HttpException(404, 'Board with id = :boardId not found', {
      boardId,
    })
  }

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

export async function removeList(id: number): Promise<void> {
  const list = await getRepository(List).findOne(id)

  if (!list) {
    throw new HttpException(
      404,
      'List with id = :id not found or already deleted',
      { id }
    )
  }

  await listRepository.removeListById(list)
}
