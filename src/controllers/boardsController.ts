import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'
import { CreateBoardRequestDto } from '../dto/boardsDto'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { Board } from '../entities/board'
// import { Board } from '../models/board'
// import { List } from '../models/list'
// import { Task } from '../models/task'
// import { User } from '../models/user'
import { createBoardSchema, updateBoardSchema } from '../Schemes/BoardSchemes'
// import createBoard,
// deleteBoard,
// getBoard,
// getBoards,
// updateBoard,
// '../services/boardsService'

export const boardsRouter = Router()

boardsRouter.get('/boards', async (req, res, next): Promise<void> => {
  try {
    const boards = getRepository(Board)
      .createQueryBuilder()
      .select('id')
      .where('id = 10')
      .getOne()

    logger.info(boards)
    await res.send(boards)
  } catch (error) {
    logger.error(error)
    next()
  }
})

// boardsRouter.get('/boards/:id', (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id)

//     if (isNaN(id)) {
//       logger.error('id is not valid')
//       throw new HttpException(400, 'Bad request')
//     }

//     const board = getBoard(id)

//     res.status(200).send(board)
//   } catch (error) {
//     next(error)
//   }
// })

// boardsRouter.post(
//   '/boards',
//   validationMiddleware(createBoardSchema),
//   (req, res, next) => {
//     try {
//       const newBoard: CreateBoardRequestDto = req.body

//       const created = createBoard(newBoard)
//       res.status(201)
//       res.send(created)
//     } catch (error) {
//       next(error)
//     }
//   }
// )

// boardsRouter.delete('/boards/:id', (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id)
//     if (isNaN(id)) {
//       logger.error('id is not valid')
//       throw new HttpException(400, 'Bad request')
//     }

//     deleteBoard(id)
//     res.status(200).send()
//   } catch (error) {
//     next(error)
//   }
// })

// boardsRouter.patch(
//   '/boards/:id',
//   validationMiddleware(updateBoardSchema),
//   (req, res, next) => {
//     try {
//       const id = parseInt(req.params.id)
//       if (isNaN(id)) {
//         logger.error('id is not valid')
//         throw new HttpException(400, 'Bad request')
//       }

//       const updated = updateBoard(id, req.body)

//       res.status(200)
//       res.send(updated)
//     } catch (error) {
//       next(error)
//     }
//   }
// )
