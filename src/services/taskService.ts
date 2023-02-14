import { getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import {
  CreatedTaskDto,
  CreateTaskDto,
  GetTasksDto,
  UpdatedTaskDto,
  UpdateTaskDto,
} from '../dto/tasksDto'
import { PayloadDto } from '../dto/userDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import * as taskRepository from '../repositories/taskRepository'

export async function getTasks(
  listId: number,
  payload: PayloadDto
): Promise<GetTasksDto[]> {
  const tasks = await taskRepository.getTaskById(listId, payload.id)

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }))
}

export async function createTask(
  listId: number,
  taskDto: CreateTaskDto,
  payload: PayloadDto
): Promise<CreatedTaskDto> {
  const list = await getRepository(List)
    .createQueryBuilder('list')
    .leftJoin('list.board', 'board')
    .where('board.user = :userId', { userId: payload.id })
    .andWhere('list.id = :listId', { listId })
    .getOne()

  if (!list) {
    throw new HttpException(404, 'List with id = :listId not found', {
      listId,
    })
  }

  const task = new Task({
    title: taskDto.title,
    description: taskDto.description,
    completed: false,
    list: list,
  })

  const created = await taskRepository.createTask(task)

  return {
    id: created.id,
    title: created.title,
    completed: created.completed,
    description: created.description,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  }
}

export async function updateTask(
  id: number,
  taskDto: UpdateTaskDto
): Promise<UpdatedTaskDto> {
  const dbTask = await getRepository(Task).findOne(id)

  if (!dbTask) {
    throw new HttpException(404, 'Task with id = :id not found', { id })
  }

  const task = new Task(dbTask)

  task.title = taskDto.title ?? dbTask.title
  task.description = taskDto.description ?? dbTask.description
  task.completed = taskDto.completed ?? dbTask.completed
  task.updatedAt = new Date()

  const updated = await taskRepository.updateTask(task)

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    completed: updated.completed,
    updatedAt: updated.updatedAt,
  }
}

export async function removeTask(id: number): Promise<void> {
  const task = await getRepository(Task).findOne(id)

  if (!task) {
    throw new HttpException(
      404,
      'Task with id = :id not found or already deleted',
      { id }
    )
  }

  await taskRepository.removeTask(task)
}
