import { createQueryBuilder, getRepository } from 'typeorm'
import { createTaskDto, updatedTaskDto, updateTaskDto } from '../dto/tasksDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import { ListRepository } from './listRepository'

export class TaskRepository {
  static async getTasks(): Promise<Task[]> {
    return await getRepository(Task).find()
  }

  static async getTaskById(listId: number): Promise<Task[] | undefined> {
    return await getRepository(Task)
      .createQueryBuilder('task')
      .leftJoinAndSelect(List, 'list', 'list.id = task.listId')
      .where(`list.id = ${listId}`)
      .getMany()
  }

  static async deleteTaskById(id: number): Promise<void> {
    await getRepository(Task)
      .findOne(id)
      .then(async (task) => {
        if (task) await Task.remove(task)
      })
  }

  static async createTask(
    listId: number,
    taskDto: createTaskDto
  ): Promise<Task> {
    const task = await ListRepository.getListById(1).then(async (list) => {
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

  static async updateTask(id: number, taskDto: updateTaskDto): Promise<Task> {
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
}
