import express from 'express'
import { boardsRouter } from './controllers/boardsController'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { morganMiddleware } from './middlewares/morganMiddleware'
import { load } from './common/settings'
load
const app = express()
app.use(express.json())
app.use(morganMiddleware)
app.use('/', boardsRouter)
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`)
})
