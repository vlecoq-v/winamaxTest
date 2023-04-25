import axios from 'axios';
import { Message } from '../common/queue/message.js'
import { messageQueue } from '../common/queue/queue.config.js'

const MIN_DELAY = 300
const MAX_DELAY = 500

function waitRandom() {
  const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
  return new Promise(resolve => setTimeout(resolve, delay));
}

const API_URL = process.env.API_URL

messageQueue.process(async job => {
  // console.log(`job = ${JSON.stringify(job)}`)
  const message = new Message(job.data.cid, job.data.mid, job.data.idx)
  message.validate()
  waitRandom()
  try {
    axios.post(API_URL + '/processed', { ...message })
  } catch(e) { console.log(e) }
})