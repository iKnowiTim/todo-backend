import { Router } from 'express'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { signUpScheme } from '../Schemes/userSchemes'
import { SignUpDto } from '../dto/userDto'
import * as userService from '../services/userService'

export const userRouter = Router()

userRouter.post(
  '/auth/signup',
  validationMiddleware(signUpScheme),
  async (req, res, next): Promise<void> => {
    try {
      const userDto: SignUpDto = req.body

      await userService.signUp(userDto)

      res.send()
    } catch (error) {
      next(error)
    }
  }
)

userRouter.post('/auth', async (req, res, next): Promise<void> => {})
