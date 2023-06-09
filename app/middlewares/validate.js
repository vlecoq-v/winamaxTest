import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) { return next() }

  res.status(400).send({ error: errors.array() })
}
