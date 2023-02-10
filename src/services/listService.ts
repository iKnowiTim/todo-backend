import { HttpException } from '../common/httpException'
import {
  CreatedListDto,
  GetListDto,
  GetListsDto,
  UpdatedListDto,
  UpdateListDto,
} from '../dto/listsDto'
import * as listRepository from '../repositories/listRepository'
import * as boardRepository from '../repositories/boardRepository'
import { getRepository } from 'typeorm'
import { List } from '../entities/list'

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
  const list = await listRepository.updateList(id, listDto)

  return {
    id: list.id,
    title: list.title,
    description: list.description,
    updatedAt: list.updatedAt,
  }
}

export async function createList(
  boardId: number,
  listDto: UpdateListDto
): Promise<CreatedListDto> {
  const board = await boardRepository.getBoardById(boardId)

  if (!board) {
    throw new HttpException(404, 'Board not found')
  }

  const list = await listRepository.createList(boardId, listDto)

  return {
    id: list.id,
    title: list.title,
    description: list.description,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
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
