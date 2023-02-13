import { Router } from 'express'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { loginScheme, signUpScheme } from '../Schemes/userSchemes'
import { LoginDto, SignUpDto } from '../dto/userDto'
import * as userService from '../services/userService'
import { authMiddleware } from '../middlewares/authMiddleware'
import { HttpException } from '../common/httpException'

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

userRouter.post(
  '/auth/login',
  validationMiddleware(loginScheme),
  async (req, res, next): Promise<void> => {
    try {
      const loginDto: LoginDto = req.body

      const token = await userService.login(loginDto)

      res.send(token)
    } catch (error) {
      next(error)
    }
  }
)

userRouter.get(
  '/auth/me',
  authMiddleware,
  async (req, res, next): Promise<void> => {
    try {
      const user = await userService.me(req.user)
      res.send(user)
    } catch (error) {
      next(error)
    }
  }
)
