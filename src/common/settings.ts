import * as dotenv from 'dotenv'

dotenv.config()

export interface Settings {
  port: number
  database: string
  dbHost: string
  dbPort: number
  dbName: string
  dbPassword: string
  saltRounds: number
  secretKey: string
}

export const settings: Settings = {
  port: parseInt(process.env.PORT ?? '3000'),
  database: process.env.DB_DATABASE ?? 'todo-backend',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432'),
  dbName: process.env.DB_USERNAME ?? 'tim',
  dbPassword: process.env.DB_PASSWORD ?? '76543219q',
  saltRounds: parseInt(process.env.SALT_ROUNDS ?? '8'),
  secretKey: process.env.SECRET_KEY ?? 'SECRET_KEY_RANDOM',
}
