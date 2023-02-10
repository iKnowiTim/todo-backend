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
import { List } from '../entities/list'
import { Task } from '../entities/task'
import * as taskRepository from '../repositories/taskRepository'

export async function getTasks(listId: number): Promise<GetTasksDto[]> {
  const tasks = await taskRepository.getTaskById(listId)

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
  taskDto: CreateTaskDto
): Promise<CreatedTaskDto> {
  const list = await getRepository(List).findOne(listId)

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
  const task = await taskRepository.updateTask(id, taskDto)

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    updatedAt: task.updatedAt,
  }
}
