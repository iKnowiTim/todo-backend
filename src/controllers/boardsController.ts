import { NextFunction, Request, Response, Router } from 'express'

import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateBoardRequestDto, UpdateBoardResponseDto } from '../dto/boardsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'

import { createBoardSchema, updateBoardSchema } from '../Schemes/boardSchemes'

import { BoardRepository } from '../repositories/boardRepository'
import { BoardService } from '../services/boardsService'

export const boardsRouter = Router()

boardsRouter.get('/boards', async (req, res, next): Promise<void> => {
  try {
    await BoardService.getBoards().then((boards) => {
      res.send(boards)
    })
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

    await BoardService.getBoard(id).then(async (board) => {
      if (!board) {
        res.status(404).send('Not found')
      }
      await res.send(board)
    })
  } catch (error) {
    next(error)
  }
})

boardsRouter.post(
  '/boards',
  validationMiddleware(createBoardSchema),
  async (req, res, next): Promise<void> => {
    try {
      const newBoard: CreateBoardRequestDto = req.body

      await BoardRepository.postBoard(newBoard)
      res.send(newBoard)
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

    await BoardRepository.deleteBoardById(id).then(() => {
      res.send('board was delete')
    })
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

      await BoardRepository.updateBoard(id, req.body).then((updated) => {
        res.send(updated)
      })
    } catch (error) {
      next(error)
    }
  }
)
