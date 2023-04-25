import React, { useState, useEffect } from 'react'
import socketIOClient, { Socket } from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://localhost:3000/'
const socket = socketIOClient(ENDPOINT)
const EVENT_PROCESSED = 'processed'

function App() {
  const [total, setTotal] = useState(0)
  const [processingTime, setProcessingTime] = useState('waiting')
  const [done, setDone] = useState(true)
  const [mid, setMid] = useState(1)
  let count = 0

  useEffect(() => {
    const interval = setInterval(() => {
      if (!done) {
        setProcessingTime(prevElapsedTime => prevElapsedTime + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [done])
  console.log('mounting component')

  useEffect(()=>{
    console.log("use Effect")
    socket.on('connect', () => {
      console.log("Connected")
    })

    socket.on(EVENT_PROCESSED, (req) => {
      // console.log(`enqueue Done received with ${JSON.stringify(req)}`)
      // console.log(`${req.result.idx} et ${count}`)
      count += 1
      if (req.result.idx) {
        if (count === total - 1) { 
          setDone(true)
          setProcessingTime(`finished in ${processingTime} seconds`)
        }
      }
    })
    return () => socket.off(EVENT_PROCESSED)
  },[total])


  function sendRequest(jobNumber, mid) {
    // const startDate = Date.now();
    count = 0

    console.log('send request')
    socket.emit('enqueue', {count: jobNumber, mid: mid})
  }

  return (
    <div className="App">
      <h1>Test technique Winamax</h1>
      <label htmlFor="count">Nombre d'éléments: </label>
      <input
        type="number"
        id="total"
        value={total}
        onChange={(e) => {
          setTotal(parseInt(e.target.value))
        }}
      />
      <button onClick={() => {
          setDone(false)
          setProcessingTime(0)
          setMid(mid + 1)
          sendRequest(total, mid)
        }}>Send</button>
      <div>Temps de traitement: {processingTime} {(done === false) ? 'secondes' : ''}</div>
    </div>
  );
}

export default App
