import { Router } from 'express'
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

boardsRouter.get('/boards', (req, res) => {
  res.status(200)
  res.send(getBoards())
})

boardsRouter.get('/boards/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400)
    res.send('So stupid, check your request')
    return
  }

  const board = getBoard(id)
  if (typeof board === 'string') {
    res.status(404)
    res.send(board)
    return
  }

  res.send(board)
})

boardsRouter.post(
  '/boards',
  validationMiddleware(createBoardSchema),
  (req, res) => {
    const newBoard: CreateBoardRequestDto = req.body

    const created = createBoard(newBoard)
    res.status(201)
    res.send(created)
  }
)

boardsRouter.delete('/boards/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400)
    res.send()
    return
  }

  deleteBoard(id)
  res.status(200)
  res.send()
})

boardsRouter.patch(
  '/boards/:id',
  validationMiddleware(updateBoardSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id) || !req.body) {
      res.status(400)
      res.send('So stupid, check your request')
      return
    }

    try {
      const updated = updateBoard(id, req.body)

      res.status(200)
      res.send(updated)
    } catch (err) {
      res.status(404).send('not found')
      return
    }
  }
)
