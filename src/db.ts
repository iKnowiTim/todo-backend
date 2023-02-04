import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import ormconfig from '../ormconfig'
import { logger } from './common/logger'

export async function initializePostgresConnection() {
  try {
    const postgresConnectionOptions = await createConnection(
      ormconfig as ConnectionOptions
    )
    logger.info(`Connected to todo-backend`)
  } catch (error) {
    logger.error(`Error connection todo-backend: ${error}`)
  }
}
