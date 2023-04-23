import { Router } from 'express'
import { matchedData, query } from 'express-validator'
import { log } from '../utils/logger.js'
import { validate } from '../middlewares/validate.js'

export const router = Router()

router.get('/', query('name').notEmpty(), validate, (req, res) => {
  const data = matchedData(req)
  res.send(`Hello, ${data.name}!`)
})
