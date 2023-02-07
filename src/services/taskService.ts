import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import {
  createdTaskDto,
  createTaskDto,
  getTasksDto,
  updatedTaskDto,
  updateTaskDto,
} from '../dto/tasksDto'
import { Task } from '../entities/task'
import * as taskRepository from '../repositories/taskRepository'

export async function getTasks(listId: number): Promise<getTasksDto[]> {
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
  taskDto: createTaskDto
): Promise<createdTaskDto> {
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
  taskDto: updateTaskDto
): Promise<updatedTaskDto> {
  const task = await taskRepository.updateTask(id, taskDto)

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    updatedAt: task.updatedAt,
  }
}
