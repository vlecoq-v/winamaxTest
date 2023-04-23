import { config } from 'dotenv'
import express from 'express'
import { router as helloWorldRouter } from './routes/helloWorld.js'
import { validate } from './middlewares/validate.js'
import { log } from './utils/logger.js'

config()

const app = express()
app.use(express.json())
app.use(validate)

app.use('/hello_world', helloWorldRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  log.info(`Server listening on port ${port}`)
})
