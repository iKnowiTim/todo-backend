import { createQueryBuilder, getRepository } from 'typeorm'
import { CreateListDto, UpdateListDto } from '../dto/listsDto'
import { Board } from '../entities/board'
import { List } from '../entities/list'

type ListWithCount = List & { tasksCount: number }
export async function getLists(boardId: number): Promise<ListWithCount[]> {
  return (await getRepository(List)
    .createQueryBuilder('list')
    .select('list.*')
    .addSelect('count(tasks.id)', 'tasksCount')
    .leftJoin('list.tasks', 'tasks')
    .leftJoin('list.board', 'board')
    .where('board.id = :boardId', { boardId })
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

export async function createList(
  boardId: number,
  listDto: CreateListDto
): Promise<List> {
  const result = await createQueryBuilder('list')
    .insert()
    .into(List)
    .values({
      title: listDto.title,
      description: listDto.description,
      board: new Board({ id: boardId }),
    })
    .returning('*')
    .execute()

  return result.raw[0]
}

export async function updateList(
  id: number,
  listDto: UpdateListDto
): Promise<List> {
  const result = await getRepository(List)
    .createQueryBuilder('list')
    .update(List)
    .set({
      title: listDto.title,
      description: listDto.description,
      updatedAt: new Date(),
    })
    .where(`id = :id`, { id })
    .returning('*')
    .execute()

  return result.raw[0]
}
