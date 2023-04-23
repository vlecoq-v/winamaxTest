import React, { useState, useEffect } from 'react'
import socketIOClient, { Socket } from 'socket.io-client';
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);


  function sendRequest(count) {
    const startDate = Date.now();

    console.log('send request')
    socket.emit('enqueue', {count: count, mid: 1})

    socket.on('enqueueDone', (req) => {
      console.log(`enqueue Done received with ${JSON.stringify(req)}`)
      console.log(`${req.count} et ${count}`)
      if (req.count && req.count === count) {
        const endDate = new Date()
        const dateDiff = endDate - startDate
        const seconds = dateDiff / 1000
        console.log(seconds)

        setProcessingTime(seconds.toFixed(3))
      }
    })
  }

  const ENDPOINT = 'http://localhost:3000/';
  const socket = socketIOClient(ENDPOINT);

  // useEffect(() => {


  // })
  // socket.on('connect', () => {
  //   socket.emit('hello', {"test": "ok"})
  //   console.log('connected.')
  // });

  return (
    <div className="App">
      <h1>Test technique Winamax</h1>
      <label htmlFor="count">Nombre d'éléments: </label>
      <input
        type="number"
        id="count"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <button onClick={() => sendRequest(count)}>Send</button>
      <div>Temps de traitement: {processingTime} secondes</div>
    </div>
  );
}

export default App;
