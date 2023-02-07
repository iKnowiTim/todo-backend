import { createQueryBuilder, getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { CreateTaskDto, UpdatedTaskDto, UpdateTaskDto } from '../dto/tasksDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import * as listRepository from './listRepository'

export async function getTasks(): Promise<Task[]> {
  return await getRepository(Task).find()
}

export async function getTaskById(listId: number): Promise<Task[] | undefined> {
  return await getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect(List, 'list', 'list.id = task.listId')
    .where(`list.id = ${listId}`)
    .getMany()
}

export async function deleteTaskById(id: number): Promise<void> {
  const task = await getRepository(Task).findOne(id)

  if (!task) {
    throw new HttpException(404, 'Not found')
  }

  await Task.softRemove(task)
}

export async function createTask(
  listId: number,
  taskDto: CreateTaskDto
): Promise<Task> {
  const list = await listRepository.getListById(listId)
  const result = await createQueryBuilder('task')
    .insert()
    .into(Task)
    .values({
      title: taskDto.title,
      description: taskDto.description,
      completed: false,
      list: list,
    })
    .returning('*')
    .execute()

  return result.raw[0]
}

export async function updateTask(
  id: number,
  taskDto: UpdateTaskDto
): Promise<Task> {
  const result = await getRepository(Task)
    .createQueryBuilder('task')
    .update(Task)
    .set({
      title: taskDto.title,
      description: taskDto.description,
      completed: false,
      updatedAt: new Date(),
    })
    .where(`id = ${id}`)
    .returning('*')
    .execute()

  return result.raw[0]
}
