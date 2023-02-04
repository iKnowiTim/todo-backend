import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../common/httpException'
import { logger } from '../common/logger'

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof HttpException)) {
    logger.log('error', `Server error.`)
    err = new HttpException(500, 'Server error')
  }

  res.status(err.status).send({
    status: err.status,
    message: err.message,
    details: err.details,
    time: new Date(),
  })
}
