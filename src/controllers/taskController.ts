import { Router } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateTaskDto } from '../dto/tasksDto'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import * as listRepository from '../repositories/listRepository'
import * as taskRepository from '../repositories/taskRepository'
import { createTaskSchema, updateTaskSchema } from '../Schemes/taskSchemes'
import * as taskService from '../services/taskService'

export const taskRouter = Router()

taskRouter.get(
  '/lists/:id/tasks',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const listId = parseInt(req.params.id)

      if (isNaN(listId)) {
        throw new HttpException(400, 'bad request')
      }

      const task = await taskService.getTasks(listId, req.user)
      res.send(task)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)

taskRouter.post(
  '/lists/:id/tasks',
  authMiddleware,
  validationMiddleware(createTaskSchema),
  async (req, res, next): Promise<void> => {
    try {
      const listId = parseInt(req.params.id)

      if (isNaN(listId)) {
        throw new HttpException(400, 'bad request')
      }

      const listDto: CreateTaskDto = req.body

      const created = await taskService.createTask(listId, listDto, req.user)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }
)

taskRouter.delete(
  '/tasks/:id',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      await taskService.removeTask(id)
      res.send('Task removed')
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)

taskRouter.patch(
  '/tasks/:id',
  authMiddleware,
  validationMiddleware(updateTaskSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'bad request')
      }

      const taskDto = req.body

      const updated = await taskService.updateTask(id, taskDto)
      res.send(updated)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)
