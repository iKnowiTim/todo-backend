import { Router } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateListDto } from '../dto/listsDto'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import * as BoardRepository from '../repositories/boardRepository'
import * as listRepository from '../repositories/listRepository'
import { createListSchema, updateListSchema } from '../Schemes/listSchemes'
import * as listService from '../services/listService'

export const listRouter = Router()

listRouter.get(
  '/boards/:id/lists',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const boardId = parseInt(req.params.id)

      if (isNaN(boardId)) {
        throw new HttpException(400, 'Bad request')
      }

      const lists = await listService.getLists(boardId, req.user)
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }
)

listRouter.get(
  '/lists/:id',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'Bad request')
      }

      const list = await listService.getList(id, req.user)
      res.send(list)
    } catch (error) {
      next(error)
    }
  }
)

listRouter.post(
  '/boards/:id/lists',
  authMiddleware,
  validationMiddleware(createListSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'Bad request')
      }

      const listDto: CreateListDto = req.body

      const list = await listService.createList(id, listDto, req.user)
      res.send(list)
    } catch (error) {
      next(error)
    }
  }
)

listRouter.delete(
  '/lists/:id',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'Bad request')
      }

      await listService.removeList(id, req.user)
      res.send('list removed')
    } catch (error) {
      next(error)
    }
  }
)

listRouter.patch(
  '/lists/:id',
  authMiddleware,
  validationMiddleware(updateListSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'Bad request')
      }

      const listDto: CreateListDto = req.body

      const updated = await listService.updateList(id, listDto)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }
)
