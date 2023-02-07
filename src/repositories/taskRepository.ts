import { createQueryBuilder, getRepository } from 'typeorm'
import { createTaskDto, updatedTaskDto, updateTaskDto } from '../dto/tasksDto'
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
  await getRepository(Task)
    .findOne(id)
    .then(async (task) => {
      if (task) await Task.remove(task)
    })
}

export async function createTask(
  listId: number,
  taskDto: createTaskDto
): Promise<Task> {
  const task = await listRepository.getListById(1).then(async (list) => {
    return await createQueryBuilder('task')
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
      .then((result) => {
        return result.raw[0]
      })
  })

  return task
}

export async function updateTask(
  id: number,
  taskDto: updateTaskDto
): Promise<Task> {
  const task = await getRepository(Task)
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
    .then((result) => {
      return result.raw[0]
    })

  return task
}
