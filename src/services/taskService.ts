import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import {
  CreatedTaskDto,
  CreateTaskDto,
  GetTasksDto,
  UpdatedTaskDto,
  UpdateTaskDto,
} from '../dto/tasksDto'
import { Task } from '../entities/task'
import * as taskRepository from '../repositories/taskRepository'

export async function getTasks(listId: number): Promise<GetTasksDto[]> {
  const tasks = await taskRepository.getTaskById(listId)

  if (!tasks) {
    throw new HttpException(404, 'not found')
  }

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
  const task = await taskRepository.createTask(listId, taskDto)

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
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
    updatedAt: task.updatedAt,
  }
}
