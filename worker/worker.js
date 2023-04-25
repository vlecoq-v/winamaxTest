import axios from 'axios';
import { Message } from '../common/queue/message.js'
import { messageQueue } from '../common/queue/queue.config.js'

const MIN_DELAY = 300
const MAX_DELAY = 500

function waitRandom() {
  const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
  console.log(delay)
  return new Promise(resolve => setTimeout(resolve, delay));
}

const API_URL = 'http://localhost:3000'
// messageQueue.add(new Message('cid', 1, 2))

messageQueue.process(job => {
  // try {
  const message = new Message(job.data.cid, job.data.mid, job.data.idx)
  message.validate()
  waitRandom()
  axios.post(API_URL + '/processed', { ...message })
    .catch((err) => console.log(err.message, err.response.data))
  // } catch(e) { console.log(e) }
})