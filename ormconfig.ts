import { settings } from './src/common/settings'

export = {
  type: 'postgres',
  host: settings.dbHost,
  port: settings.dbPort,
  database: settings.database,
  username: settings.dbName,
  password: settings.dbPassword,
  logging: true,
  synchronize: false,
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
}
