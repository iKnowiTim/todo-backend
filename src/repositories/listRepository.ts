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
import { BoardRepository } from './boardRepository'

type ListWithCount = List & { tasksCount: number }
export class ListRepository {
  static async getLists(boardId: number): Promise<ListWithCount[]> {
    return (await getRepository(List)
      .createQueryBuilder('list')
      .leftJoinAndSelect(Board, 'board', 'board.id = list.boardId')
      .loadRelationCountAndMap('list.tasksCount', 'list.tasks')
      .where(`board.id = ${boardId}`)
      .getMany()) as ListWithCount[]
  }

  static async getListById(id: number): Promise<List | undefined> {
    return await getRepository(List)
      .createQueryBuilder('list')
      .leftJoinAndMapMany('list.tasks', Task, 'task', 'task.listId = list.id')
      .where(`list.id = ${id}`)
      .getOne()
  }

  static async deleteListById(id: number): Promise<void> {
    await getRepository(List)
      .findOne(id)
      .then(async (list) => {
        if (list) await List.remove(list)
      })
  }

  static async createList(
    boardId: number,
    listDto: CreateListDto
  ): Promise<void> {
    await BoardRepository.getBoardById(1).then(async (board) => {
      await createQueryBuilder('list')
        .insert()
        .into(List)
        .values({
          title: listDto.title,
          description: listDto.description,
          board: board,
        })
        .execute()
    })
  }

  static async updateList(id: number, listDto: UpdateListDto): Promise<void> {
    await getRepository(List)
      .createQueryBuilder('list')
      .update(List)
      .set({
        title: listDto.title,
        description: listDto.description,
        updatedAt: new Date(),
      })
      .where(`id = ${id}`)
      .execute()
  }
}
