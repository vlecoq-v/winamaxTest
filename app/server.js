import { config } from 'dotenv'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { router as helloWorldRouter } from './routes/helloWorld.js'
import { log } from './utils/logger.js'
import { enqueuController } from './controllers/enqueue.js'
import { redisClient } from './config/redis.config.js'

config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
  },
})

const startServer = async () => {
  app.use(express.json())

  app.use('/hello_world', helloWorldRouter)

  io.sockets.on('connect', socket => {
    log.info(`I have a connection ${socket.id}`)
    enqueuController(socket)
  })

  await redisClient.connect()
}

startServer()
  .then(() => {
    const port = process.env.PORT || 3000
    httpServer.listen(port, () => log.info(`Server listening on port ${port}`))
  })
