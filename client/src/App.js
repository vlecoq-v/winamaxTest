import React, { useState } from 'react'
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);

  function sendRequest(count) {
    const socket = new WebSocket("wss://example.com/api");

    const startTime = Date.now();
    let processedCount = 0;

    socket.onopen = () => {
      socket.send(JSON.stringify({ count: count }));
    };

    socket.onmessage = (event) => {
      processedCount++;
      if (processedCount === count) {
        const endTime = Date.now();
        const timeDiff = (endTime - startTime) / 1000;
        setProcessingTime(timeDiff.toFixed(2));
        socket.close();
      }
    };
  }

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
