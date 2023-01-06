import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../common/httpException'

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof HttpException)) {
    err = new HttpException(500, 'Server error')
  }

  res.status(err.status).send({
    status: err.status,
    message: err.message,
    details: err.details,
    time: new Date(),
  })
}
