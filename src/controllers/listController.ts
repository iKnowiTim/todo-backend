import { Router } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateListDto } from '../dto/listsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import * as BoardRepository from '../repositories/boardRepository'
import * as listRepository from '../repositories/listRepository'
import { createListSchema } from '../Schemes/listSchemes'
import { ListService } from '../services/listsService'

export const listRouter = Router()

listRouter.get('/boards/:id/lists', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      throw new HttpException(400, 'Bad request')
    }

    const board = await BoardRepository.getBoardById(id)

    if (!board) {
      throw new HttpException(404, `Board is Not Found with id = ${id}`)
    }

    const lists = await ListService.getLists(id)
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

    const list = await ListService.getList(id)
    res.send(list)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

listRouter.post(
  '/boards/:id/lists',
  validationMiddleware(createListSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        throw new HttpException(400, 'Bad request')
      }

      const board = await BoardRepository.getBoardById(id)

      if (!board) {
        throw new HttpException(404, `Board is Not Found with id = ${id}`)
      }

      const listDto: CreateListDto = req.body

      const list = await ListService.createList(id, listDto)
      res.send(list)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)

listRouter.delete('/lists/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      throw new HttpException(400, 'Bad request')
    }

    const list = await listRepository.getListById(id)

    if (!list) {
      throw new HttpException(404, 'Not found')
    }

    await listRepository.deleteListById(id)
    res.send('list removed')
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

listRouter.patch('/lists/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      throw new HttpException(400, 'Bad request')
    }

    const list = await listRepository.getListById(id)

    if (!list) {
      throw new HttpException(404, 'Not found')
    }

    const listDto: CreateListDto = req.body

    const updated = await ListService.updateList(id, listDto)
    res.send(updated)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})
