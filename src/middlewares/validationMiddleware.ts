import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'
import { logger } from '../common/logger'

export const validationMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body)

    if (error) {
      res.status(400).send(error.details)
      logger.error('Bad request')
      return
    }

    req.body = value

    next()
  }
}
