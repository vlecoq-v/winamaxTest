/**
 * send messages to the corresponding socket with count param
 * listen for answer 
 */
const sendMessagesAndWait = (socket, count, messages, id, start) => new Promise((resolve, reject) => {
  console.log(`STARTING with id: ${id}`)
  let countResponses = 0

  socket.on('processed', (data) => {
    countResponses++
    if (countResponses % 25 === 0) { console.log(`socket ${socket.id} at ${countResponses} / ${count}`) }

    if (countResponses >= count) {
      console.log(`socket: ${socket.id} Temps total : ${Date.now() - start}ms`)
      socket.off('processed')
      resolve()
    }
  })

  for (let i = 0; i < messages; i++) {
    const message = {
      mid: i,
      count: count,
    }
    socket.emit('enqueue', message)
  }
  console.log(`FINISHED with id: ${id}`)
})

const main = async () => {
  const commander = require('commander')
  const io = require('socket.io-client')

  commander
    .option('-m, --messages <m>', 'Nombre de messages à envoyer à l\'API')
    .option('-s, --sockets <s>', 'Nombre de sockets à ouvrir en parallèle (chacun enverra [m] messages à l\'API)')
    .option('-c, --count <c>', 'Valeur du champ count à envoyer dans chaque message')
    .parse(process.argv)

  const messages = commander.messages || 10
  const sockets = commander.sockets || 10
  const count = commander.count || 100

  const start = Date.now()

  // initiatie socket List
  const url = 'http://localhost:80'
  const socketList = []

  for (let i = 0; i < sockets; i++) {
    const socket = io.connect(url)
    socketList.push(socket)
  }

  // send messages and listen concurrently then wait for all
  await Promise.all(socketList.map((socket, index) => 
    sendMessagesAndWait(socket, count, messages, index, start)
  ))

  console.log(`finished stress test in ${Date.now() - start}`)
  process.exit(0)
}

main()

