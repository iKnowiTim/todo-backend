import express from 'express'
import { boardsRouter } from './controllers/boardController'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { morganMiddleware } from './middlewares/morganMiddleware'
import { initDataSettingsEnv } from './common/settings'
import { initializePostgresConnection } from './db'
import { listRouter } from './controllers/listController'
import { taskRouter } from './controllers/taskController'

initDataSettingsEnv()
initializePostgresConnection()

const app = express()
app.use(express.json())
app.use(morganMiddleware)
app.use('/', boardsRouter)
app.use('/', listRouter)
app.use('/', taskRouter)
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`)
})
