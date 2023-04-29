import { config } from 'dotenv'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { router as helloWorldRouter } from './routes/helloWorld.js'
import { router as processedRouter } from './routes/processed.js'
import { log } from './utils/logger.js'
import { enqueuController } from './controllers/enqueueController.js'
import { redisClient } from './config/redis.config.js'

config()

const app = express()
const httpServer = createServer(app)

const socketServer = createServer(app)
export const io = new Server(socketServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})

export const socketClients = {}

const startServer = async () => {
  app.use(express.json())

  app.use('/hello_world', helloWorldRouter)
  app.use('/processed', processedRouter)

  io.sockets.on('connect', socket => {
    socketClients[socket.id] = socket
    enqueuController(socket)

    socket.on('disconnect', _ => {
      console.log(`disconect ${socket.id}`)
      delete socketClients[socket.id]
    })
  })

  await redisClient.connect()
}

startServer()
  .then(() => {
    const apiPort = process.env.API_PORT
    httpServer.listen(apiPort, () => log.info(`Server listening on port ${apiPort} for http`))

    const socketPort = process.env.SOCKET_PORT
    socketServer.listen(socketPort, () => log.info(`Server listening on port ${socketPort} for socket`))
  })
