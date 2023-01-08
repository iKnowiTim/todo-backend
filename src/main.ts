import express from 'express'
import { boardsRouter } from './controllers/boardsController'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { morganMiddleware } from './middlewares/morganMiddleware'

const app = express()
app.use(express.json())
app.use(morganMiddleware)
app.use('/', boardsRouter)
app.use(errorMiddleware)
app.listen(3000, () => {
  console.log('listen')
})
