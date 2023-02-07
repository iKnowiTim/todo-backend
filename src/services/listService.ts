import { HttpException } from '../common/httpException'
import {
  CreatedListDto,
  GetListDto,
  GetListsDto,
  UpdatedListDto,
  UpdateListDto,
} from '../dto/listsDto'
import { List } from '../entities/list'
import * as listRepository from '../repositories/listRepository'

export class ListService {
  static async getLists(boardId: number): Promise<GetListsDto[]> {
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

  static async getList(boardId: number): Promise<GetListDto> {
    const list = await listRepository.getListById(boardId)

    if (!list) {
      throw new HttpException(404, 'Not found')
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

  static async updateList(
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

  static async createList(
    id: number,
    listDto: UpdateListDto
  ): Promise<CreatedListDto> {
    const list = await listRepository.createList(id, listDto)

    return {
      id: list.id,
      title: list.title,
      description: list.description,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    }
  }
}
