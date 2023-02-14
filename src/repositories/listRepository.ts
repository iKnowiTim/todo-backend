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

export async function getListById(id: number): Promise<List | undefined> {
  return await getRepository(List)
    .createQueryBuilder('list')
    .leftJoinAndSelect('list.tasks', 'tasks')
    .where(`list.id = :id`, { id })
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
