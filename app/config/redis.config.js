import redis from 'redis'
import { log } from '../utils/logger.js'

const url = process.env.REDIS_URL
log.info(url)

export const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
})
