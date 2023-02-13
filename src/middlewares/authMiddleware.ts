import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { HttpException } from '../common/httpException'
import { settings } from '../common/settings'
import { PayloadDto } from '../dto/userDto'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new HttpException(403, 'User is not authorized')
    }

    const decoded = jwt.verify(token, settings.secretKey) as PayloadDto

    req.user = decoded

    next()
  } catch (error) {
    throw new HttpException(403, 'User is not authorized')
  }
}
