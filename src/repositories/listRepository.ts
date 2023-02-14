import { getRepository } from 'typeorm'
import { List } from '../entities/list'

type ListWithCount = List & { tasksCount: number }
export async function getLists(
  boardId: number,
  userId: number
): Promise<ListWithCount[]> {
  return (await getRepository(List)
    .createQueryBuilder('list')
    .select('list.*')
    .addSelect('count(tasks.id)', 'tasksCount')
    .leftJoin('list.tasks', 'tasks')
    .leftJoin('list.board', 'board')
    .where('board.id = :boardId', { boardId })
    .andWhere('board.user = :userId', { userId })
    .groupBy('list.id')
    .getRawMany()) as ListWithCount[]
}

export async function getListById(
  id: number,
  userId: number
): Promise<List | undefined> {
  return await getRepository(List)
    .createQueryBuilder('list')
    .leftJoin('list.board', 'board')
    .leftJoinAndSelect('list.tasks', 'tasks')
    .where(`list.id = :id`, { id })
    .andWhere('board.user = :userId', { userId })
    .getOne()
}

export async function removeListById(list: List): Promise<void> {
  await getRepository(List).softRemove(list)
}

export async function createList(list: List): Promise<List> {
  return await getRepository(List).save(list)
}

export async function updateList(list: List): Promise<List> {
  return await getRepository(List).save(list)
}
