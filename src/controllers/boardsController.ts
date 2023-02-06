import { Router } from 'express'

import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateBoardDto } from '../dto/boardsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'

import { createBoardSchema, updateBoardSchema } from '../Schemes/boardSchemes'

import { BoardRepository } from '../repositories/boardRepository'
import { BoardService } from '../services/boardsService'

export const boardsRouter = Router()

boardsRouter.get('/boards', async (req, res, next): Promise<void> => {
  try {
    const boards = await BoardService.getBoards()
    res.send(boards)
  } catch (error) {
    logger.error(error)
    next()
  }
})

boardsRouter.get('/boards/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      logger.error('id is not valid')
      throw new HttpException(400, 'Bad request')
    }

    const board = await BoardService.getBoard(id)
    res.send(board)
  } catch (error) {
    next(error)
  }
})

boardsRouter.post(
  '/boards',
  validationMiddleware(createBoardSchema),
  async (req, res, next): Promise<void> => {
    try {
      const newBoard: CreateBoardDto = req.body

      const created = await BoardService.createBoard(newBoard)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }
)

boardsRouter.delete('/boards/:id', async (req, res, next): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      logger.error('id is not valid')
      throw new HttpException(400, 'Bad request')
    }

    await BoardRepository.deleteBoardById(id)
    res.send('Board removed')
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

boardsRouter.patch(
  '/boards/:id',
  validationMiddleware(updateBoardSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        logger.error('id is not valid')
        throw new HttpException(400, 'Bad request')
      }

      const updated = await BoardService.updateBoard(id, req.body)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }
)
