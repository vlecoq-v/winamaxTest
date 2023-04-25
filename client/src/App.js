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

  // use effect for time elapsed
  useEffect(() => {
    const interval = setInterval(() => {
      if (working) {
        setProcessingTime(prevElapsedTime => prevElapsedTime + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [working])

  //use effect comparing processed count to awaited total to set work in progress (working variable)
  useEffect(()=>{
    socket.on(EVENT_PROCESSED, (req) => {
      count += 1
      if (req.result.idx) {
        if (count === total - 1) { 
          setWorking(false)
        }
      }
    })
    return () => socket.off(EVENT_PROCESSED)
  },[total])


  function sendRequest(jobNumber, mid) {
    count = 0
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
