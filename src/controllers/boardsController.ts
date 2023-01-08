import { Router } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateBoardRequestDto } from '../dto/boardsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { createBoardSchema, updateBoardSchema } from '../Schemes/BoardSchemes'
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from '../services/boardsService'

export const boardsRouter = Router()

boardsRouter.get('/boards', (req, res, next) => {
  try {
    const response = getBoards()

    res.status(200).send(response)
  } catch (error) {
    next(error)
  }
})

boardsRouter.get('/boards/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      logger.error('id is not valid')
      throw new HttpException(400, 'Bad request')
    }

    const board = getBoard(id)

    res.status(200).send(board)
  } catch (error) {
    next(error)
  }
})

boardsRouter.post(
  '/boards',
  validationMiddleware(createBoardSchema),
  (req, res, next) => {
    try {
      const newBoard: CreateBoardRequestDto = req.body

      const created = createBoard(newBoard)
      res.status(201)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }
)

boardsRouter.delete('/boards/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      logger.error('id is not valid')
      throw new HttpException(400, 'Bad request')
    }

    deleteBoard(id)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

boardsRouter.patch(
  '/boards/:id',
  validationMiddleware(updateBoardSchema),
  (req, res, next) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        logger.error('id is not valid')
        throw new HttpException(400, 'Bad request')
      }

      const updated = updateBoard(id, req.body)

      res.status(200)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }
)
