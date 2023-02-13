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

listRouter.get('/boards/:id/lists', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      throw new HttpException(400, 'Bad request')
    }

    const board = await BoardRepository.getBoardById(id)

    if (!board) {
      throw new HttpException(404, `Board is Not Found with id = :id`, { id })
    }

    const lists = await listService.getLists(id)
    res.send(lists)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

listRouter.get('/lists/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      throw new HttpException(400, 'Bad request')
    }

    const list = await listService.getList(id)
    res.send(list)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

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

      const list = await listService.createList(id, listDto)
      res.send(list)
    } catch (error) {
      logger.error(error)
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

      await listService.removeList(id)
      res.send('list removed')
    } catch (error) {
      logger.error(error)
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
      logger.error(error)
      next(error)
    }
  }
)
