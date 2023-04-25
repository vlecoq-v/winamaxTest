import { messageQueue } from '../../common/queue/queue.config.js'
import { Message } from '../../common/queue/message.js'
import { log } from '../utils/logger.js'

export const enqueuController = (socket) => {
  socket.on('enqueue', async (req) => {
    log.info(`enqueue ${JSON.stringify(req)}`)
    if (req.count == null || req.mid == null) {
      return
    }
    const socketId = 'randomId'

    for (let step = 0; step < Number(req.count); step++) {
      messageQueue.add(new Message(socketId, req.mid, step))
    }
    log.info(`added ${req.count} messages to the queue with id: ${socketId}`)
    socket.emit('enqueueDone', { count: req.count })
  })
}
