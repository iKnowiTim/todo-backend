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
import { TaskRepository } from '../repositories/taskRepository'

export class taskService {
  static async getTasks(listId: number): Promise<getTasksDto[]> {
    const tasks = await TaskRepository.getTaskById(listId)

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

  static async createTask(
    listId: number,
    taskDto: createTaskDto
  ): Promise<createdTaskDto> {
    const task: Task = await TaskRepository.createTask(listId, taskDto)

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }

  static async updateTask(
    id: number,
    taskDto: updateTaskDto
  ): Promise<updatedTaskDto> {
    const task: Task = await TaskRepository.updateTask(id, taskDto)

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      updatedAt: task.updatedAt,
    }
  }
}
