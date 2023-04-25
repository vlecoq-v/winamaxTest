import { matchedData } from 'express-validator'
import { socketClients } from '../server.js'
import { log } from '../utils/logger.js'

export const processedController = (req) => {
  const data = matchedData(req)
  if (data.cid in socketClients) {
    socketClients[data.cid].emit('processed', { result: { idx: data.idx }, mid: data.mid })
  } else {
    log.error(`client ${data.cid} is not connected anymore`)
    // TODO act on it and delete the correspondin queue
  }
}
