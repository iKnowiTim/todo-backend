import { Router } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { createTaskDto } from '../dto/tasksDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { ListRepository } from '../repositories/listRepository'
import { TaskRepository } from '../repositories/taskRepository'
import { createTaskSchema, updateTaskSchema } from '../Schemes/taskSchemes'
import { taskService } from '../services/taskService'

export const taskRouter = Router()

taskRouter.get('/lists/:id/tasks', async (req, res, next): Promise<void> => {
  try {
    const listId = parseInt(req.params.id)

    if (isNaN(listId)) {
      throw new HttpException(400, 'bad request')
    }

    const list = await ListRepository.getListById(listId)

    if (!list) {
      throw new HttpException(404, 'not found')
    }

    await taskService.getTasks(listId).then(async (tasks) => {
      await res.send(tasks)
    })
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

taskRouter.post(
  '/lists/:id/tasks',
  validationMiddleware(createTaskSchema),
  async (req, res, next): Promise<void> => {
    try {
      const listId = parseInt(req.params.id)

      if (isNaN(listId)) {
        throw new HttpException(400, 'bad request')
      }

      const listDto: createTaskDto = req.body

      await taskService.createTask(listId, listDto).then(async (task) => {
        res.send(task)
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)

taskRouter.delete('/tasks/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    await TaskRepository.deleteTaskById(id).then(() => {
      res.send('Task removed')
    })
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

taskRouter.patch(
  '/tasks/:id',
  validationMiddleware(updateTaskSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'bad request')
      }

      const taskDto = req.body

      await taskService.updateTask(id, taskDto).then(async (task) => {
        await res.send(task)
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)
