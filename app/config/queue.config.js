import Queue from 'bull'

const redisUrl = process.env.REDIS_URL
const QUEUE_ID = 'messageQueue'

export const messageQueue = new Queue(QUEUE_ID, redisUrl)
