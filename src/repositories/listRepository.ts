import { number } from 'joi'
import { createQueryBuilder, getRepository } from 'typeorm'
import {
  CreatedListDto,
  CreateListDto,
  GetListDto,
  UpdateListDto,
} from '../dto/listsDto'
import { Board } from '../entities/board'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import * as BoardRepository from './boardRepository'

type ListWithCount = List & { tasksCount: number }
export async function getLists(boardId: number): Promise<ListWithCount[]> {
  return (await getRepository(List)
    .createQueryBuilder('list')
    .leftJoinAndSelect(Board, 'board', 'board.id = list.boardId')
    .loadRelationCountAndMap('list.tasksCount', 'list.tasks')
    .where(`board.id = ${boardId}`)
    .getMany()) as ListWithCount[]
}

export async function getListById(id: number): Promise<List | undefined> {
  return await getRepository(List)
    .createQueryBuilder('list')
    .leftJoinAndMapMany('list.tasks', Task, 'task', 'task.listId = list.id')
    .where(`list.id = ${id}`)
    .getOne()
}

export async function deleteListById(id: number): Promise<void> {
  await getRepository(List)
    .createQueryBuilder()
    .softDelete()
    .from(List)
    .where(`id = ${id}`)
    .execute()
}

export async function createList(
  boardId: number,
  listDto: CreateListDto
): Promise<List> {
  const list = await BoardRepository.getBoardById(1).then(async (board) => {
    return await createQueryBuilder('list')
      .insert()
      .into(List)
      .values({
        title: listDto.title,
        description: listDto.description,
        board: board,
      })
      .returning('*')
      .execute()
      .then((result) => {
        return result.raw[0]
      })
  })

  return list
}

export async function updateList(
  id: number,
  listDto: UpdateListDto
): Promise<List> {
  const list = await getRepository(List)
    .createQueryBuilder('list')
    .update(List)
    .set({
      title: listDto.title,
      description: listDto.description,
      updatedAt: new Date(),
    })
    .where(`id = ${id}`)
    .returning('*')
    .execute()
    .then((result) => {
      return result.raw[0]
    })

  return list
}
