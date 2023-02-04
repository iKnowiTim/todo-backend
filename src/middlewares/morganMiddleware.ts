import morgan, { StreamOptions } from 'morgan'
import { logger } from '../common/logger'

const stream: StreamOptions = {
  write: (message) => {
    logger.info(message)
  },
}

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
)
