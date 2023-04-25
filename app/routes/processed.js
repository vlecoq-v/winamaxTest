import { Router } from 'express'
import { body, matchedData } from 'express-validator'
import { validate } from '../middlewares/validate.js'
import { io } from '../server.js'

export const router = Router()

const processedValidator = [
  body('cid').notEmpty(),
  body('mid').isNumeric(),
  body('idx').isNumeric(),
]

router.post('/', processedValidator, validate, (req, res) => {
  const data = matchedData(req)
  console.log(data)
  io.sockets.emit('processed', { result: { idx: data.idx }, mid: data.mid })
})
