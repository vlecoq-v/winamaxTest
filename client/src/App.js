import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://localhost:80/'
const socket = socketIOClient(ENDPOINT)
const EVENT_PROCESSED = 'processed'

function App() {
  const [total, setTotal] = useState(0)
  const [processingTime, setProcessingTime] = useState(0)
  const [working, setWorking] = useState(false)
  const [mid, setMid] = useState(1)
  let count = 0

  useEffect(() => {
    const interval = setInterval(() => {
      if (working) {
        setProcessingTime(prevElapsedTime => prevElapsedTime + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [working])
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
          setWorking(false)
        }
      }
      console.log(`received ${req.result.idx}`)
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
          // reset state variables for display
          setWorking(true)
          setProcessingTime(0)

          // send request with new information
          setMid(mid + 1)
          sendRequest(total, mid)
        }}>Send</button>
      <div>Temps de traitement: {processingTime} {(working === true) ? 'secondes' : ''}</div>
    </div>
  );
}

export default App
