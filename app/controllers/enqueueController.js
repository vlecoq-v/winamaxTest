import { messageQueue } from '../../common/queue/queue.config.js'
import { Message } from '../../common/queue/message.js'

export const enqueuController = (socket) => {
  socket.on('enqueue', async (req) => {
    if (req.count == null || req.mid == null) {
      return
    }

    for (let step = 0; step < Number(req.count); step++) {
      messageQueue.add(new Message(socket.id, req.mid, step))
    }
    socket.emit('enqueueDone', { count: req.count })
  })
}
