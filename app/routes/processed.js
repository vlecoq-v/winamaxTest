import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middlewares/validate.js'
import { processedController } from '../controllers/processedController.js'

export const router = Router()

const processedValidator = [
  body('cid').notEmpty(),
  body('mid').isNumeric(),
  body('idx').isNumeric(),
]

router.post('/', processedValidator, validate, (req, _) => processedController(req))
