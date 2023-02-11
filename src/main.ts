import express from 'express'
import { boardsRouter } from './controllers/boardController'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { morganMiddleware } from './middlewares/morganMiddleware'
import { initializePostgresConnection } from './db'
import { listRouter } from './controllers/listController'
import { taskRouter } from './controllers/taskController'
import { settings } from './common/settings'
import { userRouter } from './controllers/userController'

initializePostgresConnection()

const app = express()
app.use(express.json())
app.use(morganMiddleware)
app.use('/', boardsRouter)
app.use('/', listRouter)
app.use('/', taskRouter)
app.use('/', userRouter)
app.use(errorMiddleware)
app.listen(settings.port, () => {
  console.log(`Listen on port ${settings.port}`)
})
