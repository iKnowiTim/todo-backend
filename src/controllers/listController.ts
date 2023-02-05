import { Router } from 'express'
import { getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateListDto } from '../dto/listsDto'
import { Board } from '../entities/board'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { BoardRepository } from '../repositories/boardRepository'
import { ListRepository } from '../repositories/listRepository'
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

    await ListService.getLists(id).then(async (lists) => {
      await res.send(lists)
    })
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

    await ListService.getList(id).then(async (list) => {
      await res.send(list)
    })
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

      await ListRepository.createList(id, listDto).then(async (list) => {
        await res.send(list)
      })
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

    const list = await ListRepository.getListById(id)

    if (!list) {
      throw new HttpException(404, 'Not found')
    }

    await ListRepository.deleteListById(id).then(() => {
      res.send('Done. List removed')
    })
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

    const list = await ListRepository.getListById(id)

    if (!list) {
      throw new HttpException(404, 'Not found')
    }

    const listDto: CreateListDto = req.body

    await ListRepository.updateList(id, listDto).then(async (list) => {
      await res.send(list)
    })
  } catch (error) {
    logger.error(error)
    next(error)
  }
})
