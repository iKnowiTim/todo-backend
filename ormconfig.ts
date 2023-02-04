export = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'todo-backend',
  username: 'tim',
  password: '76543219q',
  logging: true,
  synchronize: false,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
}
