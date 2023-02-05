import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { getTasksDto } from '../dto/tasksDto'
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
}
