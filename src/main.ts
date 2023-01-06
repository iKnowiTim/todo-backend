import express from 'express'
import { boardsRouter } from './controllers/boardsController'

const app = express()
app.use(express.json())
app.use('/', boardsRouter)
app.listen(3000, () => {
  console.log('listen')
})
