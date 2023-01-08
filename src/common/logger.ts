import winston, { createLogger, format } from 'winston'

export const logger = createLogger({
  format: winston.format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
})
