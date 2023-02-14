import { createQueryBuilder, getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { CreateTaskDto, UpdatedTaskDto, UpdateTaskDto } from '../dto/tasksDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import * as listRepository from './listRepository'

export async function getTasks(): Promise<Task[]> {
  return await getRepository(Task).find()
}

export async function getTaskById(
  listId: number,
  userId: number
): Promise<Task[]> {
  return await getRepository(Task)
    .createQueryBuilder('task')
    .select('task.*')
    .leftJoin('task.list', 'lists')
    .leftJoin('lists.board', 'board')
    .where(`lists.id = :listId`, { listId })
    .andWhere('board.user = :userId', { userId })
    .getRawMany()
}

export async function removeTask(task: Task): Promise<void> {
  await Task.softRemove(task)
}

export async function createTask(task: Task): Promise<Task> {
  return await getRepository(Task).save(task)
}

export async function updateTask(task: Task): Promise<Task> {
  return await getRepository(Task).save(task)
}
