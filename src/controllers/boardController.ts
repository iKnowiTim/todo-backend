import { Router } from 'express'

import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateBoardDto } from '../dto/boardsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'

import { createBoardSchema, updateBoardSchema } from '../Schemes/boardSchemes'

import * as boardRepository from '../repositories/boardRepository'
import * as boardService from '../services/boardService'
import { authMiddleware } from '../middlewares/authMiddleware'

export const boardsRouter = Router()

boardsRouter.get(
  '/boards',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const boards = await boardService.getBoards(req.user)
      res.send(boards)
    } catch (error) {
      logger.error(error)
      next()
    }
  }
)

boardsRouter.get(
  '/boards/:id',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        logger.error('id is not valid')
        throw new HttpException(400, 'Bad request')
      }

      const board = await boardService.getBoard(id)
      res.send(board)
    } catch (error) {
      next(error)
    }
  }
)

boardsRouter.post(
  '/boards',
  authMiddleware,
  validationMiddleware(createBoardSchema),
  async (req, res, next): Promise<void> => {
    try {
      const newBoard: CreateBoardDto = req.body

      const created = await boardService.createBoard(newBoard)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }
)

boardsRouter.delete(
  '/boards/:id',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        logger.error('id is not valid')
        throw new HttpException(400, 'Bad request')
      }

      await boardService.removeBoard(id)
      res.send('Board removed')
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
)

boardsRouter.patch(
  '/boards/:id',
  authMiddleware,
  validationMiddleware(updateBoardSchema),
  async (req, res, next): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        logger.error('id is not valid')
        throw new HttpException(400, 'Bad request')
      }

      const updated = await boardService.updateBoard(id, req.body)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }
)
