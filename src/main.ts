import express from 'express'
import { boardsRouter } from './controllers/boardsController'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app = express()
app.use(express.json())
app.use('/', boardsRouter)
app.use(errorMiddleware)
app.listen(3000, () => {
  console.log('listen')
})
